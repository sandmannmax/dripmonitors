import { ProductDTO } from "../dto/ProductDTO";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { ProductMap } from "../mappers/ProductMap";

export interface IProductsService {
  getProductsByMonitorpageId({ monitorpageId }: { monitorpageId: string }): Promise<ProductDTO[]>;
  activateProductMonitoring({ productId }: { productId: string }): Promise<void>;
  disableProductMonitoring({ productId }: { productId: string }): Promise<void>;
}

export class ProductsService {
  private readonly productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  public async getProductsByMonitorpageId({ monitorpageId }: { monitorpageId: string }): Promise<ProductDTO[]> {
    let products = await this.productRepo.getProductsByMonitorpageId(monitorpageId);

    let productsDTO: ProductDTO[] = [];

    for (let i = 0; i < products.length; i++) {
      productsDTO.push(ProductMap.toDTO(products[i]));
    }

    return productsDTO;
  }

  public async activateProductMonitoring({ productId }: { productId: string }): Promise<void> {
    let product = await this.productRepo.getProductById(productId);
    product.activateMonitoring();
    await this.productRepo.save(product);
  }

  public async disableProductMonitoring({ productId }: { productId: string }): Promise<void> {
    let product = await this.productRepo.getProductById(productId);
    product.disableMonitoring();
    await this.productRepo.save(product);
  }
}