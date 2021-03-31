import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { GetProductsRequest, GetProductsResponse, AddMonitoredProductRequest, AddMonitoredProductResponse, RemoveMonitoredProductRequest, RemoveMonitoredProductResponse, GetFiltersRequest, GetFiltersResponse, AddFilterRequest, AddFilterResponse, RemoveFilterRequest, RemoveFilterResponse, Product as GrpcProduct, Filter } from '../../proto/monitor/v1/monitor_pb';
import { ProductsService } from '../../application/services/ProductsService';
import { FiltersService } from '../../application/services/FiltersService';
import { ProductRequestDTOToGrpcProduct } from '../mappers/ProductRequestDTOToGrpcProduct';
import { FilterRequestDTOToGrpcFilter } from '../mappers/FilterRequestDTOToGrpcFilter';

export class MonitorServer {
  private productsService: ProductsService;
  private filtersService: FiltersService;

  constructor({ productsService, filtersService }: { productsService: ProductsService, filtersService: FiltersService }) {
    this.productsService = productsService;
    this.filtersService = filtersService;
  }
  
  async getProducts(call: ServerUnaryCall<GetProductsRequest, GetProductsResponse>, callback: sendUnaryData<GetProductsResponse>): Promise<void> {
    try {
      let monitorpageName = call.request.getMonitorpageName();

      let products = await this.productsService.getProductsByMonitorpageName({ monitorpageName });
      let grpcProducts: GrpcProduct[] = ProductRequestDTOToGrpcProduct.MultiMap(products);

      let response = new GetProductsResponse();
      response.setProductsList(grpcProducts);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async addMonitoredProduct(call: ServerUnaryCall<AddMonitoredProductRequest, AddMonitoredProductResponse>, callback: sendUnaryData<AddMonitoredProductResponse>): Promise<void> {
    try {
      let productId = call.request.getId();

      await this.productsService.addMonitoredProduct({ productId });

      let response = new AddMonitoredProductResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  
  async removeMonitoredProduct(call: ServerUnaryCall<RemoveMonitoredProductRequest, RemoveMonitoredProductResponse>, callback: sendUnaryData<RemoveMonitoredProductResponse>): Promise<void> {
    try {
      let productId = call.request.getId();

      await this.productsService.removeMonitoredProduct({ productId });
      
      let response = new RemoveMonitoredProductResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async getFilters(call: ServerUnaryCall<GetFiltersRequest, GetFiltersResponse>, callback: sendUnaryData<GetFiltersResponse>): Promise<void> {
    try {
      let monitorpageName = call.request.getMonitorpageName();

      let filters = await this.filtersService.getFiltersByMonitorpageName({ monitorpageName });
      let grpcFilters: Filter[] = FilterRequestDTOToGrpcFilter.MultiMap(filters);

      let response = new GetFiltersResponse();
      response.setFiltersList(grpcFilters);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  

  async addFilter(call: ServerUnaryCall<AddFilterRequest, AddFilterResponse>, callback: sendUnaryData<AddFilterResponse>): Promise<void> {
    try {
      let monitorpageName = call.request.getMonitorpageName();
      let filterValue = call.request.getValue();

      let filter = await this.filtersService.addFilter({ monitorpageName, filterValue });
      let grpcFilter: Filter = FilterRequestDTOToGrpcFilter.Map(filter);

      let response = new AddFilterResponse();
      response.setFilter(grpcFilter);
      response.setMonitorpageName(monitorpageName);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async removeFilter(call: ServerUnaryCall<RemoveFilterRequest, RemoveFilterResponse>, callback: sendUnaryData<RemoveFilterResponse>): Promise<void> {
    try {
      let monitorpageName = call.request.getMonitorpageName();
      let filterId = call.request.getId();

      await this.filtersService.deleteFilter({ monitorpageName, filterId });

      let response = new RemoveFilterResponse();

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
}