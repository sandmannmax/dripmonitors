import { logger } from "../logger";
import { MonitorModel } from "../models/MonitorModel";
import { MonitorpageModel } from "../models/MonitorpageModel";
import { ProductModel } from "../models/ProductModel";
import { ProxyModel } from "../models/ProxyModel";
import { DiscordService } from "../services/DiscordService";
import { RunningTrackerService } from "../services/RunningTrackerService";
import { Product } from "../types/Product";
import { AfewMonitor } from "./AfewMonitor";
import { NikeMonitor } from "./NikeMonitor";
import { SupremeMonitor } from "./SupremeMonitor";

export const Run = async function ({ id, techname, name }: { id: string, techname: string, name: string}) {
  try {
    let canStart = RunningTrackerService.Start(id);

    if (!canStart)
      return;

    const proxy = await ProxyModel.GetRandomProxy({ monitorpageId: id });

    if (!proxy) {
      logger.error(`${techname} - ${id}: No Proxy Available`);
      RunningTrackerService.Stop(id);
      return;
    }

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
      default:
        products = [];
        logger.warn(`${techname} - ${id}: No Handler in Monitor`);
    }

    if (products == null) {
      await ProxyModel.SetCooldown({ proxyId: proxy.id, monitorpageId: id });
      RunningTrackerService.Stop(id);
      return;
    }

    if (await ProxyModel.IsCooldown({ proxyId: proxy.id, monitorpageId: id }))
      await ProxyModel.ResetCooldown({ proxyId: proxy.id, monitorpageId: id });

    let isMonitorpageVisible = await MonitorpageModel.IsVisible({ id });

    if (techname == 'supreme')
      logger.debug(`isMonitorpageVisible = ${isMonitorpageVisible}`);

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
  
    RunningTrackerService.Stop(id);
  }
  catch (e) {
    logger.error(`${techname} - ${id}: Error - ${JSON.stringify(e)}`);
    RunningTrackerService.Stop(id);
  }    
}