import { MonitorpageId } from "../../domain/models/MonitorpageId";
import { Product } from "../../domain/models/Product";
import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { UseFilterUseCase } from "../../domain/services/UseFilterUseCase";
import { logger as parentLogger } from "../../util/logger";
import { RunMonitorCommandDTO } from "../dto/RunMonitorCommandDTO";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { IMonitor } from "./IMonitor";
import { Logger } from 'pino';

export abstract class BaseMonitor implements IMonitor {
  protected monitorpageId: string;
  protected scraperService: IScraperService;
  protected productRepo: IProductRepo;
  protected filterRepo: IFilterRepo;
  protected notificationService: INotificationService;
  protected useFilterUseCase: UseFilterUseCase;
  protected logger: Logger;

  constructor(monitorpageId: string, scraperService: IScraperService, productRepo: IProductRepo, filterRepo: IFilterRepo, notificationService: INotificationService) {
    this.monitorpageId = monitorpageId;
    this.scraperService = scraperService;
    this.productRepo = productRepo;
    this.filterRepo = filterRepo;
    this.notificationService = notificationService;
    this.useFilterUseCase = new UseFilterUseCase();
    this.logger = parentLogger.child({ monitorpage: this.monitorpageId });
  }

  public async run(command: RunMonitorCommandDTO): Promise<void> {
    this.logger.info('Started.');

    try {
      let products = await this.scrapeProducts(command);

      if (products.length == 0) {
        this.logger.info('No Products retreived.');
        return;
      }

      await this.updateProducts(products, command);
      await this.updateMonitoredProducts(products, command);
    } catch (error) {
      this.logger.error(error);
    }
  }

  protected async updateProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorCommandDTO): Promise<void> {
    let filters = await this.filterRepo.getFiltersByMonitorpageId(this.monitorpageId);
    
    for (let i = 0; i < productsScraped.length; i++) {
      let id = Product.calculateUuid(productsScraped[i].productId);
      const exists = await this.productRepo.exists(id.toValue().toString());
      let product: Product;

      if (!exists) {
        product = Product.create({
          productId: productsScraped[i].productId,
          name: productsScraped[i].name,
          href: productsScraped[i].href,
          img: productsScraped[i].img,
          monitored: false,
          monitorpageId: MonitorpageId.create({ value: this.monitorpageId })
        });
        product = this.useFilterUseCase.execute({ product, filters });
      } else {
        product = await this.productRepo.getProductById(id.toValue().toString());
      }

      product.updateBasicPropertiesFromScraped(productsScraped[i]);

      if (product.shouldSave) {
        this.productRepo.save(product);
      }
    }
  }

  protected async updateMonitoredProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorCommandDTO): Promise<void> {
    let products = await this.productRepo.getProductsByMonitorpageId(this.monitorpageId);

    products = products.filter(p => p.monitored === true);
    
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productScraped = productsScraped.find(p => p.productId === product.productId);

      if (productScraped == undefined) {
        this.logger.warn('product not scraped.');
      } else {
        product.updateMonitoredPropertiesFromScraped(productScraped);

        if (product.shouldNotify) {
          let notifySubject: NotifySubjectDTO = product.createNotifySubject()
          this.notificationService.notify(notifySubject, command.targets);
        }

        if (product.shouldSave) {
          this.productRepo.save(product);
        }
      }
    }
  }

  protected abstract scrapeProducts(command: RunMonitorCommandDTO): Promise<ProductScrapedDTO[]>;
}