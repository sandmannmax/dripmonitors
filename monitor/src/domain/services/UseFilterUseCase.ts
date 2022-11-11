import { UseCase } from "../../core/base/UseCase";
import { Filter } from "../models/Filter";
import { Product } from "../models/Product";

interface UseFilterUseCaseRequest {
  product: Product;
  filters: Filter[];
}

export class UseFilterUseCase implements UseCase<UseFilterUseCaseRequest, Product> {
  execute(request: UseFilterUseCaseRequest): Product {
    for (let i = 0; i < request.filters.length; i++) {
      let productIsAccepted = request.filters[i].useFilter(request.product);
      if (productIsAccepted) {
        request.product.activateMonitoring();
        break;
      }
    }
    
    return request.product;
  }  
}