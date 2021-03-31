import { ProductRequestDTO } from "../dto/ProductRequestDTO";
import { IProductRepo } from "../interface/IProductRepo";
import { ProductMap } from "../mappers/ProductMap";

export class ProductsService {
  private readonly productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  public async getProductsByMonitorpageName({ monitorpageName }: { monitorpageName: string }): Promise<ProductRequestDTO[]> {
    let products = await this.productRepo.getProductsByMonitorpageName(monitorpageName);

    let productsDTO: ProductRequestDTO[] = [];

    for (let i = 0; i < products.length; i++) {
      productsDTO.push(ProductMap.toDTO(products[i]));
    }

    return productsDTO;
  }

  public async addMonitoredProduct({ productId }: { productId: string }): Promise<void> {
    let product = await this.productRepo.getProductById(productId);
    product.monitored = true;
    await this.productRepo.save(product);
  }

  public async removeMonitoredProduct({ productId }: { productId: string }): Promise<void> {
    let product = await this.productRepo.getProductById(productId);
    product.monitored = false;
    await this.productRepo.save(product);
  }
}