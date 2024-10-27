import { PaymentMethodType } from '../../../enums';

export abstract class PaymentMethod {
  protected type: PaymentMethodType;
  protected isDefault: boolean;
  protected last4Digits: number;

  public getType(): PaymentMethodType {
    return this.type;
  }

  public getLast4Digits(): number {
    return this.last4Digits;
  }

  public isDefaultMethod(): boolean {
    return this.isDefault;
  }

  public abstract getName(): string;
}
