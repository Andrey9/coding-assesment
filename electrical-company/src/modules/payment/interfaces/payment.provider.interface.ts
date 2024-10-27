import { PaymentMethod } from '../../customer/entities/payment-method.entity';

export interface PaymentProviderInterface {
  charge (customerId: number, amount: number, paymentMethod: PaymentMethod): Promise<void>;
}
