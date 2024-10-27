import { PaymentMethod } from './payment-method.entity';

export class CardPaymentMethod extends PaymentMethod {
  private readonly brand: string;

  public getName(): string {
    return this.brand;
  }
}
