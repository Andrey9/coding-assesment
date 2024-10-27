import { PaymentMethod } from './payment-method.entity';

export class USBankPaymentMethod extends PaymentMethod {
  private readonly bankName: string;
  private readonly accountType: string;

  public getName(): string {
    return this.bankName;
  }
}
