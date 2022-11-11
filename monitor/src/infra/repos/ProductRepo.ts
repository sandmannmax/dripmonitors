import { RedisClient } from 'redis';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { IProductRepo } from '../../domain/repos/IProductRepo';
import { Product } from '../../domain/models/Product';
import { ProductMap } from '../../application/mappers/ProductMap';
import { RedisRawMap } from '../mappers/RedisRawMap';
import { Uuid } from '../../core/base/Uuid';

export class ProductRepo implements IProductRepo {
  private redisClient: WrappedNodeRedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = createNodeRedisClient(redisClient);
  }

  public async getProductByUuid(productUuid: Uuid): Promise<Product> {
    const productUuidString = productUuid.toString();
    const product = await this.getProductByUuidString(productUuidString);
    return product;
  }

  public async getProductsByMonitorpageUuid(monitorpageUuid: Uuid): Promise<Product[]> {
    const monitorpageUuidString = monitorpageUuid.toString();
    let ids = await this.redisClient.smembers(`product:monitorpage:${monitorpageUuidString}`);

    let productPromises: Promise<Product | null>[] = [];
    for (let i = 0; i < ids.length; i++) {
      productPromises.push(this.getProductByUuidString(ids[i]));
    }

    let productsOrNull = await Promise.all(productPromises);
    let products: Product[] = [];

    for (let i = 0; i < productsOrNull.length; i++) {
      let productOrNull = productsOrNull[i];
      if (productOrNull != null) {
        products.push(productOrNull);
      }
    }

    return products;
  }

  public async exists(productUuid: Uuid): Promise<boolean> {
    let result = await this.redisClient.sismember('product', productUuid.toString());
    return result == 1;
  }

  public async save(product: Product): Promise<void> {
    const productUuidString = product.uuid.toString();
    const productExists = await this.exists(product.uuid);

    let { productPersistence, sizesPersistence } = ProductMap.toPersistence(product);

    if (productExists) {
      let multi: any = this.redisClient.multi()
        .hset(`product:${productUuidString}`, ...RedisRawMap.toPersistence(productPersistence));
      
      if (sizesPersistence) {
        multi = multi.hset(`product:${productUuidString}:sizes`, ...RedisRawMap.toPersistence(sizesPersistence));
      }

      await multi.exec();
    } else {
      let multi: any = this.redisClient.multi()
        .sadd('product', productUuidString)
        .sadd(`product:monitorpage:${product.monitorpageUuid.toString()}`, productUuidString)
        .hset(`product:${productUuidString}`, ...RedisRawMap.toPersistence(productPersistence));

      if (sizesPersistence) {
        multi = multi.hset(`product:${productUuidString}:sizes`, ...RedisRawMap.toPersistence(sizesPersistence));
      }
        
      await multi.exec();
    }
  }

  public async delete(productUuid: Uuid): Promise<void> {
    const productUuidString = productUuid.toString();
    let product = await this.getProductByUuidString(productUuidString);

    if (product) {
      let fields = this.getProductFields(product);

      let multi: any = this.redisClient.multi()
        .srem('product', productUuidString)
        .srem(`product:monitorpage:${product.monitorpageUuid.toString()}`, productUuidString)
        .hdel(`product:${productUuidString}`, ...fields);

      if (product.sizes) {
        let sizesFields = product.sizes.map(o => o.value);
        multi = multi.hdel(`product:${productUuidString}:sizes`, ...fields);
      }
        
      await multi.exec();
    }
  }

  private async getProductByUuidString(productUuid: string) {
    const product = await this.redisClient.hgetall(`product:${productUuid}`);
    const sizes = await this.redisClient.hgetall(`product:${productUuid}:sizes`);
    let productRaw = RedisRawMap.toRaw(product);
    productRaw.sizes = RedisRawMap.toRaw(sizes);
    return ProductMap.toAggregate(productRaw, Uuid.create({ uuid: productUuid }));
  }

  private getProductFields(product: Product): string[] {
    let productPersistence = ProductMap.toPersistence(product);
    let productPersistenceRedis = RedisRawMap.toPersistence(productPersistence);

    let productFields: string[] = [];

    for (let i = 0; i < productPersistenceRedis.length; i++) {
      productFields.push(productPersistenceRedis[i][0]);
    }

    return productFields;
  }
}