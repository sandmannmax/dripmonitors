import { ProductDTO } from "../dto/ProductDTO";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { ProductMap } from "../mappers/ProductMap";
import { Uuid } from "../../core/base/Uuid";
import { ProductNotExistingException } from "../../core/exceptions/ProductNotExistingException";
import { Product } from "../../domain/models/Product";

export interface IProductsService {
  getProductsByMonitorpageUuid(monitorpageUuid: string): Promise<ProductDTO[]>;
  getProduct(monitorpageUuid: string, productUuid: string): Promise<ProductDTO>;
  activateProductMonitoring(monitorpageUuid: string, productUuid: string): Promise<void>;
  disableProductMonitoring(monitorpageUuid: string, productUuid: string): Promise<void>;
}

export class ProductsService {
  private readonly productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  public async getProductsByMonitorpageUuid(monitorpageUuid: string): Promise<ProductDTO[]> {
    let monitorpageUuidObject = Uuid.create({ uuid: monitorpageUuid });
    let products = await this.productRepo.getProductsByMonitorpageUuid(monitorpageUuidObject);

    let productsDTO: ProductDTO[] = [];

    for (let i = 0; i < products.length; i++) {
      productsDTO.push(ProductMap.toDTO(products[i]));
    }

    return productsDTO;
  }

  public async getProduct(monitorpageUuid: string, productUuid: string): Promise<ProductDTO> {
    const product = await this.getProductByUuidString(monitorpageUuid, productUuid);
    const productDTO: ProductDTO = ProductMap.toDTO(product);
    return productDTO;
  }

  public async activateProductMonitoring(monitorpageUuid: string, productUuid: string): Promise<void> {
    const product = await this.getProductByUuidString(monitorpageUuid, productUuid);
    product.activateMonitoring();
    await this.productRepo.save(product);
  }

  public async disableProductMonitoring(monitorpageUuid: string, productUuid: string): Promise<void> {
    const product = await this.getProductByUuidString(monitorpageUuid, productUuid);
    product.disableMonitoring();
    await this.productRepo.save(product);
  }

  private async getProductByUuidString(monitorpageUuid: string, productUuid: string): Promise<Product> {
    let monitorpageUuidObject = Uuid.create({ uuid: monitorpageUuid });
    let productUuidObject = Uuid.create({ uuid: productUuid });
    const product = await this.productRepo.getProductByUuid(productUuidObject);

    if (!product.monitorpageUuid.equals(monitorpageUuidObject)) {
      throw new ProductNotExistingException();
    }

    return product;
  }
}