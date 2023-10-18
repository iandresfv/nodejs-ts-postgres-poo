import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { CustomerDTO } from '../dto/customer.dto';

export class CustomerMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    customerValidator(req: Request, res: Response, next: NextFunction): void {
        const { address, dni, user } = req.body;
        const validCustomer = new CustomerDTO();
        validCustomer.address = address;
        validCustomer.dni = dni;
        validCustomer.user = user;

        void validate(validCustomer).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
