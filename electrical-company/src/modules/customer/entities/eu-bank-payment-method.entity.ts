import { PaymentMethod } from './payment-method.entity';

export class EuBankPaymentMethod extends PaymentMethod {
  private readonly organizationName: string;
  private readonly countryCode: string;

  public getName(): string {
    return this.organizationName;
  }
}
