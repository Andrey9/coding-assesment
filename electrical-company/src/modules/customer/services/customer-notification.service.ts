import { inject, injectable } from 'inversify';
import diTypes from '../../../diTypes';
import { CustomerService } from './customer.service';
import { failedPaymentNotificationEmail } from '../emails/failed-payment-notification.email';
import { Customer } from '../entities/customer.entity';
import { MobileCarrierEmailDomains } from '../../notification/enums';
import { EmailService } from '../../notification/services/email.service';
import { NotificationEmailFrom } from '../../../config';

@injectable()
export class CustomerNotificationService {
  constructor(
    @inject(diTypes.CustomerService) private customerRepository: CustomerService,
    @inject(diTypes.EmailService) private emailService: EmailService,
  ) {}

  async notifyCustomerAboutFailedPayment(customerId: number): Promise<void> {
    const customer = await this.customerRepository.getCustomerById(customerId);
    const message = failedPaymentNotificationEmail(customer);
    await this.emailService.sendMessage({
      from: NotificationEmailFrom,
      to: this.prepareReceiverEmailsAddresses(customer),
      messageBody: message,
    });
  }

  private prepareReceiverEmailsAddresses(customer: Customer): string[] {
    if (customer.email) {
      return [customer.email];
    }

    if (customer.mobile && customer.mobileCarrier) {
      return [`${customer.mobile}@${MobileCarrierEmailDomains[customer.mobileCarrier]}`];
    }

    if (customer.mobile) {
      return Object.values(MobileCarrierEmailDomains).map((domain) => `${customer.mobile}@${domain}`);
    }

    console.warn('Customer has no email or mobile number');
    return [];
  }
}
