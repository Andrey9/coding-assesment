import { Customer } from '../entities/customer.entity';
import { PaymentMethodType } from '../../../enums';

export function failedPaymentNotificationEmail (contact: Customer): string {
  const customerDefaultPaymentMethod = contact.getDefaultPaymentMethod();

  return emailTemplates[customerDefaultPaymentMethod.getType()](
    contact.name,
    customerDefaultPaymentMethod.getName(),
    customerDefaultPaymentMethod.getLast4Digits(),
  );
}

const emailTemplates = {
  [PaymentMethodType.Card]: (name: string, paymentMethodName: string, last4Digits: number) => `Hello, ${name},
		The scheduled payment for your electrical bill ending from your ${paymentMethodName} credit card ending in ${last4Digits} failed.		
		Please verify your payment details and try again.`,
  [PaymentMethodType.UsBank]: (name: string, paymentMethodName: string, last4Digits: number) => `Hello, ${name},
		The scheduled payment for your electrical bill ending from your ${paymentMethodName} bank in ${last4Digits} failed.		
		Please verify your payment details and try again.`,
  [PaymentMethodType.EuBank]: (name: string, paymentMethodName: string, last4Digits: number) => `Hello, ${name},
		The scheduled payment for your electrical bill ending from your ${paymentMethodName} account ending in ${last4Digits} failed.		
		Please verify your payment details and try again.`,
}
