export class Monitorrun {
  public id: string;
  public monitorpageId: string;
  public proxyId: string;
  public timestampStart: number;
  public timestampEnd: number;
  public success: boolean;
  public reason: string;

  public ToDBObject = () => {
    return { id: this.id, monitorpageId: this.monitorpageId, proxyId: this.proxyId, timestampStart: this.timestampStart, timestampEnd: this.timestampEnd, success: this.success, reason: this.reason };
  }
}