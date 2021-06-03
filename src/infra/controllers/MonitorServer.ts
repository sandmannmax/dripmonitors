import { ServerUnaryCall, sendUnaryData, handleUnaryCall } from '@grpc/grpc-js';
import { GetProductsRequest, GetProductsResponse, ActivateProductMonitoringRequest, ActivateProductMonitoringResponse, DisableProductMonitoringRequest, DisableProductMonitoringResponse, GetFiltersRequest, GetFiltersResponse, AddFilterRequest, AddFilterResponse, RemoveFilterRequest, RemoveFilterResponse, Product as GrpcProduct, Filter, AddUrlRequest, AddUrlResponse, GetMonitorpageRequest, GetMonitorpageResponse, GetMonitorpagesRequest, GetMonitorpagesResponse, GetProductRequest, GetProductResponse, GetUrlsRequest, GetUrlsResponse, RemoveUrlRequest, RemoveUrlResponse, StartMonitorpageRequest, StartMonitorpageResponse, StopMonitorpageRequest, StopMonitorpageResponse, Monitorpage as GrpcMonitorpage } from '../../proto/monitor/v1/monitor_pb';
import { IProductsService } from '../../application/services/ProductsService';
import { IMonitorpageService } from '../../application/services/MonitorpageService';
import { ProductDTOToGrpcProduct } from '../mappers/ProductDTOToGrpcProduct';
import { FilterDTOToGrpcFilter } from '../mappers/FilterDTOToGrpcFilter';
import { MonitorpageDTOToGrpcMonitorpage } from '../mappers/MonitorpageDTOToGrpcMonitorpage';
import { UrlDTOToGrpcFilter } from '../mappers/UrlDTOToGrpcUrl';
import { logger } from '../../util/logger';
import { MonitorpageNotExistingException } from '../../core/exceptions/MonitorpageNotExistingException';

export class MonitorServer {
  private monitorpageService: IMonitorpageService;
  private productsService: IProductsService;

  constructor({ monitorpageService, productsService }: { monitorpageService: IMonitorpageService, productsService: IProductsService }) {
    this.monitorpageService = monitorpageService;
    this.productsService = productsService;
  }

  async getMonitorpages(call: ServerUnaryCall<GetMonitorpagesRequest, GetMonitorpagesResponse>, callback: sendUnaryData<GetMonitorpagesResponse>): Promise<void> {
    try {
      const monitorpages = await this.monitorpageService.getMonitorpages();
      const response = new GetMonitorpagesResponse();
      response.setMonitorpagesList(MonitorpageDTOToGrpcMonitorpage.MultiMap(monitorpages));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async getMonitorpage(call: ServerUnaryCall<GetMonitorpageRequest, GetMonitorpageResponse>, callback: sendUnaryData<GetMonitorpageResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const monitorpage = await this.monitorpageService.getMonitorpageByUuid(monitorpageUuid);
      const response = new GetMonitorpageResponse();
      response.setMonitorpage(MonitorpageDTOToGrpcMonitorpage.Map(monitorpage));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  
  
  async getProducts(call: ServerUnaryCall<GetProductsRequest, GetProductsResponse>, callback: sendUnaryData<GetProductsResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const products = await this.productsService.getProductsByMonitorpageUuid(monitorpageUuid);
      const response = new GetProductsResponse();
      response.setProductsList(ProductDTOToGrpcProduct.MultiMap(products));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async getProduct(call: ServerUnaryCall<GetProductRequest, GetProductResponse>, callback: sendUnaryData<GetProductResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const productUuid = call.request.getProductUuid();
      const product = await this.productsService.getProduct(monitorpageUuid, productUuid);
      const response = new GetProductResponse();
      response.setProduct(ProductDTOToGrpcProduct.Map(product));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  

  async activateProductMonitoring(call: ServerUnaryCall<ActivateProductMonitoringRequest, ActivateProductMonitoringResponse>, callback: sendUnaryData<ActivateProductMonitoringResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const productUuid = call.request.getProductUuid();
      await this.productsService.activateProductMonitoring(monitorpageUuid, productUuid);
      const response = new ActivateProductMonitoringResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  
  async disableProductMonitoring(call: ServerUnaryCall<DisableProductMonitoringRequest, DisableProductMonitoringResponse>, callback: sendUnaryData<DisableProductMonitoringResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const productUuid = call.request.getProductUuid();
      await this.productsService.disableProductMonitoring(monitorpageUuid, productUuid);      
      const response = new DisableProductMonitoringResponse();
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  async getFilters(call: ServerUnaryCall<GetFiltersRequest, GetFiltersResponse>, callback: sendUnaryData<GetFiltersResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const filters = await this.monitorpageService.getFiltersByMonitorpageUuid(monitorpageUuid);
      const response = new GetFiltersResponse();
      response.setFiltersList(FilterDTOToGrpcFilter.MultiMap(filters));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  

  async addFilter(call: ServerUnaryCall<AddFilterRequest, AddFilterResponse>, callback: sendUnaryData<AddFilterResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const filterValue = call.request.getValue();
      await this.monitorpageService.addFilter(monitorpageUuid, filterValue);
      callback(null, new AddFilterResponse());
    } catch (e) {
      callback(e, null);
    }
  }

  async removeFilter(call: ServerUnaryCall<RemoveFilterRequest, RemoveFilterResponse>, callback: sendUnaryData<RemoveFilterResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const filterValue = call.request.getValue();
      await this.monitorpageService.removeFilter(monitorpageUuid, filterValue);
      callback(null, new RemoveFilterResponse());
    } catch (e) {
      callback(e, null);
    }
  }
  
  async getUrls(call: ServerUnaryCall<GetUrlsRequest, GetUrlsResponse>, callback: sendUnaryData<GetUrlsResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const urls = await this.monitorpageService.getUrlsByMonitorpageUuid(monitorpageUuid);
      const response = new GetUrlsResponse();
      response.setUrlsList(UrlDTOToGrpcFilter.MultiMap(urls));
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }
  
  async addUrl(call: ServerUnaryCall<AddUrlRequest, AddUrlResponse>, callback: sendUnaryData<AddUrlResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const urlValue = call.request.getValue();
      await this.monitorpageService.addUrl(monitorpageUuid, urlValue);
      callback(null, new AddUrlResponse());
    } catch (e) {
      callback(e, null);
    }
  }
  
  async removeUrl(call: ServerUnaryCall<RemoveUrlRequest, RemoveUrlResponse>, callback: sendUnaryData<RemoveUrlResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const urlValue = call.request.getValue();
      await this.monitorpageService.removeUrl(monitorpageUuid, urlValue);
      callback(null, new RemoveUrlResponse());
    } catch (e) {
      callback(e, null);
    }
  }
  
  async startMonitorpage(call: ServerUnaryCall<StartMonitorpageRequest, StartMonitorpageResponse>, callback: sendUnaryData<StartMonitorpageResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      const intervalTime = call.request.getIntervalTime();
      await this.monitorpageService.startMonitorpage(monitorpageUuid, intervalTime);
      callback(null, new StartMonitorpageResponse());
    } catch (e) {
      callback(e, null);
    }
  }
  
  async stopMonitorpage(call: ServerUnaryCall<StopMonitorpageRequest, StopMonitorpageResponse>, callback: sendUnaryData<StopMonitorpageResponse>): Promise<void> {
    try {
      const monitorpageUuid = call.request.getMonitorpageUuid();
      await this.monitorpageService.stopMonitorpage(monitorpageUuid);
      callback(null, new StopMonitorpageResponse());
    } catch (e) {
      callback(e, null);
    }
  }
}