import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getCustomers(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const customers = await this.customerService.findAllCustomers();
            if (customers.length === 0) {
                return this.httpResponse.NotFound(res, 'Customers not found');
            }
            return this.httpResponse.Ok(res, customers);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getCustomerById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const customer = await this.customerService.findCustomerById(id);
            if (customer === null) {
                return this.httpResponse.NotFound(res, `Customer with id ${id} not found`);
            }
            return this.httpResponse.Ok(res, customer);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createCustomer(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { body } = req;
            const data = await this.customerService.createCustomer(body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateCustomer(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.customerService.updateCustomer(id, body);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update customer. Customer with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.customerService.deleteCustomer(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to delete customer. Customer with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
