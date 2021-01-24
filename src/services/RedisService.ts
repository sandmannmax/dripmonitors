import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { Product } from '../types/Product';

export class RedisService {
  private client: WrappedNodeRedisClient;

  constructor() {
    this.client = createNodeRedisClient({ host: 'redis' });
  }

  async GetRunningState(monitorName) {
    return await this.client.get(`stores:${monitorName}:running`) == 'true'; 
  }
  
  async SetRunningState(monitorName: string, runningState: boolean) {
    await this.client.set(`stores:${monitorName}:running`, runningState.toString());
  }
  
  async GetProductIds(monitorName: string) {
    return await this.client.smembers(`stores:${monitorName}:products`);
  }
  
  async GetProduct(monitorName: string, productId: string): Promise<Product> {
    let values = await this.client.hgetall(`stores:${monitorName}:products:${productId}`);
    if (values == null)
      return null;
    let product = new Product();
    product._id = productId;
    product.fromValues(values);
    return product;
  }
  
  async AddProduct(monitorName: string, product: Product) {
    await this.client.sadd(`stores:${monitorName}:products`, product._id);
    await this.client.hset(`stores:${monitorName}:products:${product._id}`, ...product.toValues());
  }
  
  async ChangeSoldOutState(monitorName: string, productId: string, soldOutState: boolean) {
    await this.client.hset(`stores:${monitorName}:products:${productId}`, [ 'soldOut', soldOutState.toString() ]);
  }
  
  async ChangeActiveState(monitorName: string, productId: string, activeState: boolean) {
    await this.client.hset(`stores:${monitorName}:products:${productId}`, [ 'active', activeState.toString() ]);
  }
  
  // async GetMonitoredProductIds(monitorName: string) {
  //   return await this.client.smembers(`stores:${monitorName}:monitor:products`);
  // }
  
  // async IsMonitoredProduct(monitorName: string, productId: string) {
  //   return await this.client.sismember(`stores:${monitorName}:monitor:products`, productId) == 1;
  // }
  
  // async GetUserIdsMonitoringProduct(monitorName: string, productId: string, price: number) {
  //   let users = await this.client.smembers('users');
  //   let usersMonitoring = [];
  
  //   for (let i = 0; i < users.length; i++) {
  //     if (await this.client.sismember(`users:${users[i]}`, monitorName) == 1 && await this.client.sismember(`users:${users[i]}:${monitorName}`, productId) == 1) {
  //       let priceLimit = await this.client.hget(`users:${users[i]}:${monitorName}:${productId}`, 'price');
  //       if (Number(priceLimit) >= price)
  //         usersMonitoring.push(users[i]);
  //     }
  //   }
  //   return usersMonitoring;
  // }
}


