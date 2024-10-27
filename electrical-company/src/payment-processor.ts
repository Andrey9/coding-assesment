import diTypes from './diTypes';
import { CustomerService } from './modules/customer/services/customer.service';
import { PaymentService } from './modules/payment/services/payment.service';
import { EventBus } from './eventBus';
import diContainer from './diContainer';
import { Events } from './enums';
import { CustomerNotificationService } from './modules/customer/services/customer-notification.service';

const customersService: CustomerService = diContainer.get(diTypes.CustomerService);
const paymentService: PaymentService = diContainer.get(diTypes.PaymentService);
const customerNotificationService: CustomerNotificationService = diContainer.get(diTypes.CustomerNotificationService);
const eventBus: EventBus = diContainer.get(diTypes.EventBus);

(async function() {
	const customers = await customersService.getCustomersWithPaymentPending();

	for (const customer of customers) {
		await paymentService.processPayment(customer)
	}
})();

// Idea for improvement: this handler could be moved to a separate process
// and event should be published to a message broker (e.g. RabbitMQ or Kafka)
eventBus.subscribe(Events.PaymentFailed, async (data) => {
	await customerNotificationService.notifyCustomerAboutFailedPayment(data.customerId);
});


