import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { GetProductsRequest, GetProductsResponse, ActivateProductMonitoringRequest, ActivateProductMonitoringResponse, DisableProductMonitoringRequest, DisableProductMonitoringResponse, GetFiltersRequest, GetFiltersResponse, AddFilterRequest, AddFilterResponse, RemoveFilterRequest, RemoveFilterResponse, Product as GrpcProduct, Filter } from '../../proto/monitor/v1/monitor_pb';
import { IProductsService } from '../../application/services/ProductsService';
import { IFiltersService } from '../../application/services/FiltersService';
import { ProductDTOToGrpcProduct } from '../mappers/ProductDTOToGrpcProduct';
import { FilterDTOToGrpcFilter } from '../mappers/FilterDTOToGrpcFilter';

export class MonitorServer {
  private productsService: IProductsService;
  private filtersService: IFiltersService;

  constructor({ productsService, filtersService }: { productsService: IProductsService, filtersService: IFiltersService }) {
    this.productsService = productsService;
    this.filtersService = filtersService;
  }
  
  async getProducts(call: ServerUnaryCall<GetProductsRequest, GetProductsResponse>, callback: sendUnaryData<GetProductsResponse>): Promise<void> {
    try {
      let monitorpageId = call.request.getMonitorpageId();

      let products = await this.productsService.getProductsByMonitorpageId({ monitorpageId });
      let grpcProducts: GrpcProduct[] = ProductDTOToGrpcProduct.MultiMap(products);

      let response = new GetProductsResponse();
      response.setProductsList(grpcProducts);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async activateProductMonitoring(call: ServerUnaryCall<ActivateProductMonitoringRequest, ActivateProductMonitoringResponse>, callback: sendUnaryData<ActivateProductMonitoringResponse>): Promise<void> {
    try {
      let productId = call.request.getId();

      await this.productsService.activateProductMonitoring({ productId });

      let response = new ActivateProductMonitoringResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  
  async disableProductMonitoring(call: ServerUnaryCall<DisableProductMonitoringRequest, DisableProductMonitoringResponse>, callback: sendUnaryData<DisableProductMonitoringResponse>): Promise<void> {
    try {
      let productId = call.request.getId();

      await this.productsService.disableProductMonitoring({ productId });
      
      let response = new DisableProductMonitoringResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async getFilters(call: ServerUnaryCall<GetFiltersRequest, GetFiltersResponse>, callback: sendUnaryData<GetFiltersResponse>): Promise<void> {
    try {
      let monitorpageId = call.request.getMonitorpageId();

      let filters = await this.filtersService.getFiltersByMonitorpageId({ monitorpageId });
      let grpcFilters: Filter[] = FilterDTOToGrpcFilter.MultiMap(filters);

      let response = new GetFiltersResponse();
      response.setFiltersList(grpcFilters);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  

  async addFilter(call: ServerUnaryCall<AddFilterRequest, AddFilterResponse>, callback: sendUnaryData<AddFilterResponse>): Promise<void> {
    try {
      let monitorpageId = call.request.getMonitorpageId();
      let filterValue = call.request.getValue();

      let filter = await this.filtersService.addFilter({ monitorpageId, filterValue });
      let grpcFilter: Filter = FilterDTOToGrpcFilter.Map(filter);

      let response = new AddFilterResponse();
      response.setFilter(grpcFilter);

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async removeFilter(call: ServerUnaryCall<RemoveFilterRequest, RemoveFilterResponse>, callback: sendUnaryData<RemoveFilterResponse>): Promise<void> {
    try {
      let filterId = call.request.getId();

      await this.filtersService.deleteFilter({ filterId });

      let response = new RemoveFilterResponse();

      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
}