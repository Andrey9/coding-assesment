import { Type } from 'class-transformer';
import { PaymentMethod } from './payment-method.entity';
import { PaymentMethodType } from '../../../enums';
import { CardPaymentMethod } from './card-payment-method.entity';
import { USBankPaymentMethod } from './us-bank-payment-method.entity';
import { EuBankPaymentMethod } from './eu-bank-payment-method.entity';

export class Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  mobileCarrier: string;

  @Type(() => PaymentMethod, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: CardPaymentMethod, name: PaymentMethodType.Card },
        { value: USBankPaymentMethod, name: PaymentMethodType.UsBank },
        { value: EuBankPaymentMethod, name: PaymentMethodType.EuBank },
      ],
    }
  })
  private paymentMethods: PaymentMethod[];

  public getDefaultPaymentMethod(): PaymentMethod {
    return this.paymentMethods.find((paymentMethod) => paymentMethod.isDefaultMethod());
  }
}
