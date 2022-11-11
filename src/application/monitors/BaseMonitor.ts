import { MonitorpageName } from "../../domain/models/MonitorpageName";
import { Product } from "../../domain/models/Product";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { UseFilterUseCase } from "../../domain/services/UseFilterUseCase";
import { logger as parentLogger } from "../../util/logger";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { IMonitorpageFunctionality, RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { Logger } from 'pino';
import { Uuid } from "../../core/base/Uuid";
import { ProductPageId } from "../../domain/models/ProductPageId";

export abstract class BaseMonitor implements IMonitorpageFunctionality {
  protected monitorpageUuid: Uuid;
  protected monitorpageName: MonitorpageName;
  protected scraperService: IScraperService;
  protected productRepo: IProductRepo;
  protected notificationService: INotificationService;
  protected useFilterUseCase: UseFilterUseCase;
  protected logger: Logger;

  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService,  notificationService: INotificationService) {
    this.monitorpageUuid = monitorpageUuid;
    this.monitorpageName = monitorpageName;
    this.scraperService = scraperService;
    this.productRepo = productRepo;
    this.notificationService = notificationService;
    this.useFilterUseCase = new UseFilterUseCase();
    this.logger = parentLogger.child({ monitorpage: this.monitorpageName.value });
  }

  public async run(command: RunMonitorpageCommandDTO): Promise<void> {
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

  protected async updateProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorpageCommandDTO): Promise<void> {    
    for (let i = 0; i < productsScraped.length; i++) {
      let id = Uuid.create({ base: productsScraped[i].productPageId });
      const exists = await this.productRepo.exists(id);
      let product: Product;

      if (!exists) {
        product = Product.create({
          productPageId: ProductPageId.create({ value: productsScraped[i].productPageId }),
          monitorpageUuid: this.monitorpageUuid,
          name: productsScraped[i].name,
          href: productsScraped[i].href,
          img: productsScraped[i].img,
          monitored: false,
        });
        product = this.useFilterUseCase.execute({ product, filters: command.filters });
      } else {
        product = await this.productRepo.getProductByUuid(id);
      }

      product.updateBasicPropertiesFromScraped(productsScraped[i]);

      if (product.shouldSave) {
        this.productRepo.save(product);
      }
    }
  }

  protected async updateMonitoredProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorpageCommandDTO): Promise<void> {
    let products = await this.productRepo.getProductsByMonitorpageUuid(this.monitorpageUuid);

    products = products.filter(p => p.monitored === true);
    
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productScraped = productsScraped.find(p => p.productPageId === product.productPageId.value);

      if (productScraped == undefined) {
        this.logger.warn('product not scraped.');
      } else {
        product.updateMonitoredPropertiesFromScraped(productScraped);

        if (product.shouldNotify) {
          let notifySubject: NotifySubjectDTO = product.createNotifySubject()
          await this.notificationService.notify(notifySubject);
        }

        if (product.shouldSave) {
          this.productRepo.save(product);
        }
      }
    }
  }

  protected abstract scrapeProducts(command: RunMonitorpageCommandDTO): Promise<ProductScrapedDTO[]>;
}