import { Container } from 'inversify';
import diTypes from './diTypes';
import { CustomerRepositoryInterface } from './modules/customer/interfaces/customer.repository.interface';
import { CustomerRepository } from './modules/customer/repositories/customer.repository';
import { CustomerNotificationService } from './modules/customer/services/customer-notification.service';
import { PaymentProviderInterface } from './modules/payment/interfaces/payment.provider.interface';
import { StripeProvider } from './modules/payment/libs/stripe.provider';
import { CustomerService } from './modules/customer/services/customer.service';
import { PaymentService } from './modules/payment/services/payment.service';
import { EventBus } from './eventBus';
import { EmailProviderInterface } from './modules/notification/interfaces/email.provider.interface';
import { EmailProvider } from './modules/notification/libs/email.provider';
import { EmailService } from './modules/notification/services/email.service';

const container = new Container();

container.bind<CustomerRepositoryInterface>(diTypes.CustomerRepository).to(CustomerRepository);
container.bind<CustomerService>(diTypes.CustomerService).to(CustomerService);
container.bind<CustomerNotificationService>(diTypes.CustomerNotificationService).to(CustomerNotificationService);
container.bind<PaymentProviderInterface>(diTypes.PaymentProvider).to(StripeProvider);
container.bind<PaymentService>(diTypes.PaymentService).to(PaymentService);
container.bind<EmailProviderInterface>(diTypes.EmailProvider).to(EmailProvider);
container.bind<EmailService>(diTypes.EmailService).to(EmailService);
container.bind<EventBus>(diTypes.EventBus).to(EventBus);

export default container
