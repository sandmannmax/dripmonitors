export interface NotifyForProductCommand {
  name: string;
  href: string;
  img: string;
  price: string;
  sizes: { value: string, atc?: string }[];
  hasATC: boolean;
  monitorpageUuid: string;
}