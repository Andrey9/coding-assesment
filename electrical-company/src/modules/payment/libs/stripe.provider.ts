import { injectable } from 'inversify';
import { traceparent } from 'tctx';
import { PaymentProviderInterface } from '../interfaces/payment.provider.interface';
import { StripeApiKey } from '../../../config';
import { PaymentMethod } from '../../customer/entities/payment-method.entity';
import { PaymentErrorCodes } from '../../../enums';

@injectable()
export class StripeProvider implements PaymentProviderInterface {
  public async charge (
    customerId: number,
    amount: number,
    paymentMethod: PaymentMethod,
  ): Promise<void> {
    try {
      const response = await fetch('https://api.stripe.com/some-payment-endpoint', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Traceparent: traceparent.make().toString(),
          Authorization: `Bearer ${StripeApiKey}`
        },
        body: JSON.stringify({
          customerId,
          paymentMethod,
          amount,
        })
      })

      if (!response.ok) {
        throw new Error(PaymentErrorCodes.PaymentFailed);
      }
      // result is not handled, so it is not necessary to return it
      // idea for improvement: use the result and store as a payment record
    } catch (error) {
      console.error('Error calling Stripe payment API:', error);
      throw error;
    }
  }
}
