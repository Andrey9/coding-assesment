import { injectable } from 'inversify';
import { Customer } from '../entities/customer.entity';
import { CustomerRepositoryInterface } from '../interfaces/customer.repository.interface';

@injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  public async getCustomerById(id: number): Promise<Customer> {
    return this.customerRepository.getCustomerById(id);
  }

  public async getCustomersWithPaymentPending(): Promise<Customer[]> {
    return this.customerRepository.getCustomersWithPaymentPending();
  }
}
