export abstract class BaseException {
  public readonly message?: string;

  constructor(message?: string) {
    this.message = message;
  }
}
