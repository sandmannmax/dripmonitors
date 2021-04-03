import { RedisClient } from 'redis';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { IProductRepo } from '../../domain/repos/IProductRepo';
import { Product } from '../../domain/models/Product';
import { ProductMap } from '../../application/mappers/ProductMap';
import { RedisRawMap } from '../mappers/RedisRawMap';

export class ProductRepo implements IProductRepo {
  private redisClient: WrappedNodeRedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = createNodeRedisClient(redisClient);
  }

  async getProductById(id: string): Promise<Product> {
    let product = await this.redisClient.hgetall(`product:${id}`);
    let sizes = await this.redisClient.hgetall(`product:${id}:sizes`);
    let productRaw = RedisRawMap.toRaw(product);
    productRaw.sizes = RedisRawMap.toRaw(sizes);
    return ProductMap.toAggregate(productRaw);
  }

  async getProductsByMonitorpageId(monitorpageId: string): Promise<Product[]> {
    let ids = await this.redisClient.smembers(`product:monitorpage:${monitorpageName}`);

    let productPromises: Promise<Product | null>[] = [];
    for (let i = 0; i < ids.length; i++) {
      productPromises.push(this.getProductById(ids[i]));
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

  async exists(id: string): Promise<boolean> {
    let result = await this.redisClient.sismember('product', id);
    return result == 1;
  }

  async save(product: Product): Promise<void> {
    let productId = product.id.toValue().toString();
    let productExists = await this.exists(productId);

    let { productPersistence, sizesPersistence } = ProductMap.toPersistence(product);

    if (productExists) {
      let multi: any = this.redisClient.multi()
        .hset(`product:${productId}`, ...RedisRawMap.toPersistence(productPersistence));
      
      if (sizesPersistence) {
        multi = multi.hset(`product:${productId}:sizes`, ...RedisRawMap.toPersistence(sizesPersistence));
      }

      await multi.exec();
    } else {
      let multi: any = this.redisClient.multi()
        .sadd('product', productId)
        .sadd(`product:monitorpage:${product.monitorpage.name}`, productId)
        .hset(`product:${productId}`, ...RedisRawMap.toPersistence(productPersistence));

      if (sizesPersistence) {
        multi = multi.hset(`product:${productId}:sizes`, ...RedisRawMap.toPersistence(sizesPersistence));
      }
        
      await multi.exec();
    }
  }

  async delete(id: string): Promise<void> {
    let product = await this.getProductById(id);

    if (product) {
      let fields = this.getProductFields(product);

      let multi: any = this.redisClient.multi()
        .srem('product', id)
        .srem(`product:monitorpage:${product.monitorpage.name}`, id)
        .hdel(`product:${id}`, ...fields);

      if (product.sizes) {
        let sizesFields = product.sizes.map(o => o.value);
        multi = multi.hdel(`product:${id}:sizes`, ...fields);
      }
        
      await multi.exec();
    }
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