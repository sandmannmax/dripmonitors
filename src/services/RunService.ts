import { Service } from 'typedi';
import { logger } from '../logger';
import { ScraperClientService } from './ScraperClientService';
import { Monitorrun } from '../models/Monitorrun';
import { Monitorpage } from '../models/Monitorpage';
import { Url } from '../models/Url';
import { Product } from '../models/Product';
import { Cooldown } from '../models/Cooldown';
import { ProxyService } from './ProxyService';
import { ProductScraped } from '../types/ProductScraped';
import { DiscordService } from './DiscordService';
import { Monitor } from '../models/Monitor';
import { BucketService } from './BucketService';
import safeEval from 'notevil';

@Service()
export class RunService {

  constructor(
    private proxyService: ProxyService,
    private discordService: DiscordService,
    private bucketService: BucketService,
    private scraperClientService: ScraperClientService
  ) {}

  public async Run({ id }: { id: string }) {
    let monitorrun = Monitorrun.build({ monitorpageId: id, timestampStart: new Date().getTime() });
  
    try {
      let monitorpage = await Monitorpage.findByPk(id);

      if (monitorpage && !monitorpage.currentRunningState)
        monitorpage = await monitorpage.update({ currentRunningState: true });
      else
        return;

      let func = '';

      try {
        func = await this.bucketService.Download({ fileName: id + 'script.js'});
      } catch {}

      if (!func) {  
        monitorrun.timestampEnd = new Date().getTime();
        monitorrun.success = false;
        monitorrun.reason = 'No Function defined for this Monitorpage';
        await monitorrun.save();
  
        await monitorpage.update({ currentRunningState: false });
        return;
      }

      let urls = await Url.findAll({ where: { monitorpageId: monitorpage.id }});

      if (!urls || urls.length == 0) {  
        monitorrun.timestampEnd = new Date().getTime();
        monitorrun.success = false;
        monitorrun.reason = 'No Urls set for this Monitorpage';
        await monitorrun.save();
  
        await monitorpage.update({ currentRunningState: false });
        return;
      }
  
      const proxy = await this.proxyService.GetRandomProxy({ monitorpage });
      await this.proxyService.ReduceCooldowns({ monitorpage });
  
      if (!proxy) {  
        monitorrun.timestampEnd = new Date().getTime();
        monitorrun.success = false;
        monitorrun.reason = 'No Proxy Available';
        await monitorrun.save();
  
        await monitorpage.update({ currentRunningState: false });
        return;
      }
  
      monitorrun.proxyId = proxy.id;

      let products: Array<ProductScraped> = [];

      let f = safeEval.Function('content', 'log', 'json', 'Date', func);

      for (let i = 0; i < urls.length; i++) {
        let content = await this.scraperClientService.Get({ url: urls[i].url, proxy: proxy.address, isHtml: monitorpage.isHtml });

        let productsScraped = f(content, (text: string) => {}, JSON.parse, Date);

        products.push(productsScraped);
      }
        
      if (products.length == 0) {
        await this.proxyService.SetCooldown({ proxyId: proxy.id, monitorpageId: id });
  
        monitorrun.timestampEnd = new Date().getTime();
        monitorrun.success = false;
        monitorrun.reason = 'Did not retreive products';
        await monitorrun.save();
  
        await monitorpage.update({ currentRunningState: false });
        return;
      }
  
      await this.proxyService.ResetCooldown({ proxyId: proxy.id, monitorpageId: id });
  
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let oldProduct = await Product.findByPk(product.id);
        let sendMessage = false;
        let size = '';
  
        if (oldProduct == null) { // New Product
  
          // if (monitorpage.techname === 'supreme')
          //   product = await SupremeMonitor.ComplementProduct({ product, proxy });

          // TODO: Wie complement product?
  
          if (product) {
            let newProduct = product.CreateProduct();
            newProduct.save();
            for (let j = 0; j < product.sizes.length; j++) {
              newProduct.createSize({ value: product.sizes[j].value, soldOut: product.sizes[j].soldOut });
            }
  
            if (product.active && !product.soldOut) { // If active and not sold out send all sizes
              sendMessage = true;
              if (product.sizes) {
                for (let j = 0; j < product.sizes.length; j++) {
                  if (!product.sizes[j].soldOut)
                    size += product.sizes[j].value + ' - '; 
                }
                if (size.length > 3)
                  size = size.substr(0, size.length - 3);
              }              
            }
          }        
        } else { // Product already in DB
          if (monitorpage.techname === 'supreme') {
            product.name = oldProduct.name;
            product.price = oldProduct.price!;
          }
  
          if (product.active && !product.soldOut) { // If active and not sold out then
  
            if (!oldProduct.active || oldProduct.soldOut) { // If the old Product was inactive or soldout send all and update
              oldProduct = await this.UpdateProduct({ product, oldProduct });
              sendMessage = true;
              if (product.sizes) {
                for (let j = 0; j < product.sizes.length; j++) {
                  if (!product.sizes[j].soldOut)
                    size += product.sizes[j].value + ' - '; 
                }
                if (size.length > 3)
                  size = size.substr(0, size.length - 3);
              }
            } else { // Else (old Product also was active and not sold out)
              let update = false;

              if (product.sizes && oldProduct.sizes) {
                for (let j = 0; j < product.sizes.length; j++) { // Iterate over all sizes in new Product
                  let index = oldProduct.sizes.findIndex(item => item.value == product.sizes![j].value); // Find index of same size
    
                  if (index != -1) { // if same size was found on old Product
                    if (product.sizes[j].soldOut != oldProduct.sizes[index].soldOut) { // and the soldout state changed
                      update = true; // then update
    
                      if (!product.sizes[j].soldOut) { // if its not sold out then send size with message
                        sendMessage = true;
                        size += product.sizes[j].value + ' - ';
                      }
                    }
                  } else { // if new size then update
                    update = true;
    
                    if (!product.sizes[j].soldOut) { // if this size is not sold out sent size with message
                      sendMessage = true;
                      size += product.sizes[j].value + ' - ';
                    }
                  }
                }
              } else if (product.sizes) { // If oldProduct doesnt have sizes add all
                update = true;

                for (let j = 0; j < product.sizes.length; j++) { // Iterate over all sizes in new Product
                  if (!product.sizes[j].soldOut) { // if this size is not sold out sent size with message
                    sendMessage = true;
                    size += product.sizes[j].value + ' - ';
                  }
                }
              }
              
              if (oldProduct.sizes) {
                for (let j = 0; j < oldProduct.sizes.length; j++) { // Iterate over all sizes in old Product
                  let index = -1;
                  if (product.sizes)
                    index = product.sizes.findIndex(item => item.value == oldProduct!.sizes![j].value); // Find index of same size
    
                  if (index == -1) { // if size is not in sizes of new product, add size and set to soldOut
                    oldProduct.sizes[j].update({ soldOut: true });
                  }
                }
              }

              if (update) {
                oldProduct = await this.UpdateProduct({ product, oldProduct });
                if (size.length > 3)
                  size = size.substr(0, size.length - 3);
              }
            }  
          } else {
            let update = false;
  
            if (product.active != oldProduct.active)
              update = true;
  
            if (product.soldOut != oldProduct.soldOut)
              update = true;
  
            for (let j = 0; j < product.sizes.length; j++) { // Iterate over all sizes in new Product
              let index = -1;
              if (oldProduct.sizes)
                index = oldProduct.sizes.findIndex(item => item.value == product.sizes[j].value); // Find index of same size
  
              if (index != -1) { // if same size was found on old Product
                if (product.sizes[j].soldOut != oldProduct.sizes![index].soldOut) // and the soldout state changed
                  update = true; // then update
              } else // if new size then update
                update = true;
            }
  
            if (update)
              oldProduct = await this.UpdateProduct({ product, oldProduct });
          }
        }
  
        if (sendMessage && monitorpage.visible) {
          let monitors = await Monitor.findAll({ where: { running: true }});
          let monitorsSend = new Array<Monitor>();

          if (monitors) {
            for (let j = 0; j < monitors.length; j++) {
              let appendMonitor = false;

              let sources = monitors[j].monitorsources;

              if (sources) {
                for (let k = 0; k < sources.length; k++) {
                  if (sources[k].all) {
                    appendMonitor = true;
                    break;
                  } else if (sources[k].productId != null && sources[k].productId == product.id) {
                    appendMonitor = true;
                    break;
                  } else if (sources[k].monitorpageId != null && sources[k].monitorpageId == id) {
                    appendMonitor = true;
                    break;
                  }
                }
              }

              if (appendMonitor)
                monitorsSend.push(monitors[j]);
            }
  
            this.discordService.SendMessage({ monitors: monitorsSend, product, size, page: monitorpage.name });
          }
        }
      }
  
      monitorrun.timestampEnd = new Date().getTime();
      monitorrun.success = true;
      await monitorrun.save();

      await monitorpage.update({ currentRunningState: false });
    }
    catch (e) {
      logger.error(`${id}: Error - ${e}`);
  
      try {
        monitorrun.timestampEnd = new Date().getTime();
        monitorrun.success = false;
        monitorrun.reason = 'Error while executing';
        await monitorrun.save();
      } catch {
        logger.warn(`${id}: Monitorrun couldnt be inserted`)
      }

      try {
        let monitorpage = await Monitorpage.findByPk(id);  
        await monitorpage!.update({ currentRunningState: false });
      } catch {
        logger.error(`${id}: currentRunningState couldnt be unset`);
        // TODO: Exit Process?
      }
    }    
  }

  private async UpdateProduct({ product, oldProduct }: { product: ProductScraped, oldProduct: Product }): Promise<Product> {
    oldProduct.name = product.name;
    oldProduct.href = product.href;
    oldProduct.img = product.img;
    oldProduct.price = product.price;
    oldProduct.active = product.active;
    oldProduct.soldOut = product.soldOut;
    return await oldProduct.save();
  }
}