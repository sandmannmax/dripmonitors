import { UniqueEntityID } from "../../core/base/UniqueEntityID";

export interface ProductRequestDTO {
  id: UniqueEntityID;
  productId: string;
  name: string;
  href: string;
  img: string;
  monitored: boolean;
}