import { inject, injectable } from 'inversify';
import { EventBus } from '../../../eventBus';
import { PaymentProviderInterface } from '../interfaces/payment.provider.interface';
import { Customer } from '../../customer/entities/customer.entity';
import { Events } from '../../../enums';
import diTypes from '../../../diTypes';

@injectable()
export class PaymentService {
  constructor(
    @inject(diTypes.PaymentProvider) private readonly paymentProvider: PaymentProviderInterface,
    @inject(diTypes.EventBus) private readonly eventBus: EventBus,
  ) {}

  public async processPayment(customer: Customer): Promise<void> {
    try {
      const amount = this.getCustomerPaymentAmount(customer.id)

      await this.paymentProvider.charge(customer.id, amount, customer.getDefaultPaymentMethod())
      this.eventBus.publish(Events.PaymentSucceeded, { customerId: customer.id })
      console.log('Successfully processed payment for customer', customer.id);
    } catch (error) {
      this.eventBus.publish(Events.PaymentFailed, { customerId: customer.id, error: error })
      console.error('The payment failed to process:', error);
    }
  }

  public getCustomerPaymentAmount(customerId: number): number {
    const amount = Math.floor(Math.random() * (100 - 50 + 1) + 50) + Math.random();
    return Number(amount.toFixed(2));
  }
}
