import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { ProductDTO } from '../dto/product.dto';

export class ProductMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    productValidator(req: Request, res: Response, next: NextFunction): void {
        const { productName, description, price, category } = req.body;
        const validProduct = new ProductDTO();
        validProduct.productName = productName;
        validProduct.description = description;
        validProduct.category = category;
        validProduct.price = price;

        void validate(validProduct).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
