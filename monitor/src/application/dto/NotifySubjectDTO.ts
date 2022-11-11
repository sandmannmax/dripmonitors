import { NotifySizeDTO } from "./NotifySizeDTO";

export interface NotifySubjectDTO {
  name: string;
  href: string;
  img: string;
  price: string;
  sizes: NotifySizeDTO[];
  hasATC: boolean;
  monitorpageUuid: string;
}