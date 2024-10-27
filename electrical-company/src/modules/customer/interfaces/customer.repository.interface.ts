import { Customer } from '../entities/customer.entity';

export interface CustomerRepositoryInterface {
  getCustomerById(id: number): Promise<Customer>;
  getCustomersWithPaymentPending(): Promise<Customer[]>;
}
