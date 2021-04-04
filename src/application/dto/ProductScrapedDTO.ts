import { PriceDTO } from "./PriceDTO";
import { SizeDTO } from "./SizeDTO";

export interface ProductScrapedDTO {
  productId: string;
  name: string;
  href: string;
  img: string;
  active?: boolean;
  price?: PriceDTO;
  sizes?: SizeDTO[];
}