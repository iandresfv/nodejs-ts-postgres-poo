import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';

export class PurchaseProductMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    purchaseProductValidator(req: Request, res: Response, next: NextFunction): void {
        const { quantityProduct, totalPrice, purchase, product } = req.body;
        const validPurchaseProduct = new PurchaseProductDTO();
        validPurchaseProduct.quantityProduct = quantityProduct;
        validPurchaseProduct.totalPrice = totalPrice;
        validPurchaseProduct.purchase = purchase;
        validPurchaseProduct.product = product;

        void validate(validPurchaseProduct).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
