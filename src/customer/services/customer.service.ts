import { type DeepPartial, type DeleteResult, type UpdateResult } from 'typeorm';
import { type QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseService } from '../../config/base.service';
import { CustomerEntity } from '../entities/customer.entity';
import { type CustomerDTO } from '../dto/customer.dto';

export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity);
    }

    async findAllCustomers(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        const customerEntity: DeepPartial<CustomerEntity> = {
            ...body,
            dni: body.dni.toString(), // convert dni to string
        };
        return (await this.execRepository).save(customerEntity);
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updateCustomer(id: string, body: CustomerDTO): Promise<UpdateResult> {
        const customerEntity: QueryDeepPartialEntity<CustomerEntity> = {
            ...body,
            dni: body.dni.toString(), // convert dni to string
        };
        return (await this.execRepository).update({ id }, customerEntity);
    }
}
