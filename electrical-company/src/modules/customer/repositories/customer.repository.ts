import { injectable } from 'inversify';
// Could be improved: should be read using node:fs module
import customers from '../../../customer-list.json';
import { Customer } from '../entities/customer.entity';
import { CustomerRepositoryInterface } from '../interfaces/customer.repository.interface';
import { plainToInstance } from 'class-transformer';

@injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  public async getCustomerById(id: number): Promise<Customer> {
    return plainToInstance(Customer, customers.find(customer => customer.id === id));
  }

  public async getCustomersWithPaymentPending(): Promise<Customer[]> {
    return customers.map(customer => plainToInstance(Customer, customer));
  }
}
