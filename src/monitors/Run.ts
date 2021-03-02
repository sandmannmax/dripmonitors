import { logger } from "../logger";
import { MonitorModel } from "../models/MonitorModel";
import { MonitorpageModel } from "../models/MonitorpageModel";
import { MonitorrunModel } from "../models/MonitorrunModel";
import { ProductModel } from "../models/ProductModel";
import { ProxyModel } from "../models/ProxyModel";
import { DiscordService } from "../services/DiscordService";
import { Monitorrun } from "../types/Monitorrun";
import { Product } from "../types/Product";
import { AfewMonitor } from "./AfewMonitor";
import { NikeMonitor } from "./NikeMonitor";
import { SupremeMonitor } from "./SupremeMonitor";
import { async } from 'crypto-random-string';
import { ZalandoMonitor } from "./ZalandoMonitor";
import { ScraperClientProvider } from '../provider/ScraperClientProvider'
import { GetProductsRequest, Product as ProductGRPC } from '../proto/scraper/v1/scraper_pb'


export const Run = async function ({ id, techname, name }: { id: string, techname: string, name: string}) {
  let monitorrun = new Monitorrun();

  try {
    let canStart = await MonitorpageModel.Start({ id });

    if (!canStart)
      return;

    let monitorrunId;
    do {
      monitorrunId = await async({length: 24})
    } while (!await MonitorrunModel.IdUnused({ id: monitorrunId }));
  
    monitorrun.id = monitorrunId;
    monitorrun.timestampStart = new Date().getTime();
    monitorrun.monitorpageId = id;

    const proxy = await ProxyModel.GetRandomProxy({ monitorpageId: id });

    if (!proxy) {
      if (!await MonitorpageModel.NoProxyMessageSent({ id })) {
        logger.error(`${techname} - ${id}: No Proxy Available`);  
        await MonitorpageModel.UpdateNoProxyMessageSent({ id, value: true });
      }

      monitorrun.timestampEnd = new Date().getTime();
      monitorrun.success = false;
      monitorrun.reason = 'No Proxy Available';
      await MonitorrunModel.AddMonitorrun({ monitorrun });

      await MonitorpageModel.Stop({ id });
      return;
    } else if (await MonitorpageModel.NoProxyMessageSent({ id })) 
      await MonitorpageModel.UpdateNoProxyMessageSent({ id, value: false });

    monitorrun.proxyId = proxy.id;

    let products: Array<Product>;

    switch(techname) {
      case 'nike':
        products = await NikeMonitor.GetProducts({ proxy });
        break;
      case 'afew':
        products = await AfewMonitor.GetProducts({ proxy });
        break;
      case 'supreme':
        products = await SupremeMonitor.GetProducts({ proxy });
        break;
      case 'zalando':
        try {
          products = await GetProducts({ techname, proxy: proxy.address });
        } catch {
          products = null;
        }
        break;
      default:
        products = [];
        logger.warn(`${techname} - ${id}: No Handler in Monitor`);
    }

    if (products == null) {
      await ProxyModel.SetCooldown({ proxyId: proxy.id, monitorpageId: id });

      monitorrun.timestampEnd = new Date().getTime();
      monitorrun.success = false;
      monitorrun.reason = 'Did not retreive products';
      await MonitorrunModel.AddMonitorrun({ monitorrun });

      await MonitorpageModel.Stop({ id });
      return;
    }

    if (await ProxyModel.IsCooldown({ proxyId: proxy.id, monitorpageId: id }))
      await ProxyModel.ResetCooldown({ proxyId: proxy.id, monitorpageId: id });

    let isMonitorpageVisible = await MonitorpageModel.IsVisible({ id });

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let oldProduct = await ProductModel.GetProduct({ id: product.id });
      let sendMessage = false;
      let size = '';

      if (oldProduct == null) { // New Product

        if (techname === 'supreme')
          product = await SupremeMonitor.ComplementProduct({ product, proxy });

        if (product) {
          await ProductModel.AddProduct({ product, monitorpageId: id });

          if (product.active && !product.soldOut) { // If active and not sold out send all sizes
            sendMessage = true;
            for (let j = 0; j < product.sizes.length; j++) {
              if (!product.sizesSoldOut[j])
                size += product.sizes[j] + ' - '; 
            }
            if (size.length > 3)
              size = size.substr(0, size.length - 3);
          }
        }        
      } else { // Product already in DB
        if (techname === 'supreme') {
          product.name = oldProduct.name;
          product.price = oldProduct.price;
        }

        if (product.active && !product.soldOut) { // If active and not sold out then

          if (!oldProduct.active || oldProduct.soldOut) { // If the old Product was inactive or soldout send all and update
            await ProductModel.UpdateProduct({ product, monitorpageId: id });
            sendMessage = true;
            for (let j = 0; j < product.sizes.length; j++) {
              if (!product.sizesSoldOut[j])
                size += product.sizes[j] + ' - '; 
            }
            if (size.length > 3)
              size = size.substr(0, size.length - 3);
          } else if (oldProduct.active && !oldProduct.soldOut) { // If the old Product also was active and not sold out then
            let update = false;

            for (let j = 0; j < product.sizes.length; j++) { // Iterate over all sizes in new Product
              let index = oldProduct.sizes.findIndex(item => item == product.sizes[j]); // Find index of same size

              if (index != -1) { // if same size was found on old Product
                if (product.sizesSoldOut[j] != oldProduct.sizesSoldOut[index]) { // and the soldout state changed
                  update = true; // then update

                  if (!product.sizesSoldOut[j]) { // if its not sold out then send size with message
                    sendMessage = true;
                    size += product.sizes[j] + ' - ';
                  }
                }
              } else { // if new size then update
                update = true;

                if (!product.sizesSoldOut[j]) { // if this size is not sold out sent size with message
                  sendMessage = true;
                  size += product.sizes[j] + ' - ';
                }
              }
            }

            for (let j = 0; j < oldProduct.sizes.length; j++) { // Iterate over all sizes in old Product
              let index = product.sizes.findIndex(item => item == oldProduct.sizes[j]); // Find index of same size

              if (index == -1) { // if size is not in sizes of new product, add size and set to soldOut
                product.sizes.push(oldProduct.sizes[j]);
                product.sizesSoldOut.push(true);
              }
            }

            if (update) {
              await ProductModel.UpdateProduct({ product, monitorpageId: id});
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
            let index = oldProduct.sizes.findIndex(item => item == product.sizes[j]); // Find index of same size

            if (index != -1) { // if same size was found on old Product
              if (product.sizesSoldOut[j] != oldProduct.sizesSoldOut[index]) // and the soldout state changed
                update = true; // then update
            } else // if new size then update
              update = true;
          }

          if (update) {
            await ProductModel.UpdateProduct({ product, monitorpageId: id});
          }
        }
      }

      if (sendMessage && isMonitorpageVisible) {
        let monitors = await MonitorModel.GetMonitors({ product, monitorpageId: id });
        DiscordService.SendMessage({ monitors, product, size, page: name });
      }
    }

    monitorrun.timestampEnd = new Date().getTime();
    monitorrun.success = true;
    await MonitorrunModel.AddMonitorrun({ monitorrun });
  
    await MonitorpageModel.Stop({ id });
  }
  catch (e) {
    logger.error(`${techname} - ${id}: Error - ${e}`);

    try {
      monitorrun.timestampEnd = new Date().getTime();
      monitorrun.success = false;
      monitorrun.reason = 'Error while executing';
      await MonitorrunModel.AddMonitorrun({ monitorrun });
    } catch {
      logger.warn(`${techname} - ${id}: Monitorrun couldnt be inserted`)
    }

    await MonitorpageModel.Stop({ id });
  }    
}

function GetProducts({ techname, proxy }): Promise<Product[]> {
  return new Promise<Product[]>((resolve, reject) => {
    const client = ScraperClientProvider.getInstance();

    var request: GetProductsRequest = new GetProductsRequest();
    request.setTechname(techname);
    request.setProxyAddress(proxy);

    client.getProducts(request, (error, response) => {
      if (error) reject(error)
      else {
        let productsGRPC = response.getProductsList();
        let products: Product[] = [];
        for (let i = 0; i < productsGRPC.length; i++) {
          let product = new Product();
          product.id = productsGRPC[i].getId();
          product.name = productsGRPC[i].getName();
          product.href = productsGRPC[i].getHref();
          product.img = productsGRPC[i].getImg();
          product.price = productsGRPC[i].getPrice();
          product.active = productsGRPC[i].getActive();
          product.hasSizes = productsGRPC[i].getHasSizes();
          product.soldOut = productsGRPC[i].getSoldOut();
          product.sizes = productsGRPC[i].getSizesList();
          product.sizesSoldOut = productsGRPC[i].getSizesSoldOutList();
          products.push(product);
        }
        resolve(products);
      }
    });
  });  
}