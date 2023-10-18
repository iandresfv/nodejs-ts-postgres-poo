import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { PurchaseDTO } from '../dto/purchase.dto';
import { HttpResponse } from '../../shared/response/http.response';

export class PurchaseMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    purchaseValidator(req: Request, res: Response, next: NextFunction): void {
        const { status, paymentMethod, customer } = req.body;
        const validPurchase = new PurchaseDTO();
        validPurchase.status = status;
        validPurchase.paymentMethod = paymentMethod;
        validPurchase.customer = customer;

        void validate(validPurchase).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
