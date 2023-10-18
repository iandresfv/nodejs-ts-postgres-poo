import { validate } from 'class-validator';
import { type NextFunction, type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { CategoryDTO } from '../dto/category.dto';

export class CategoryMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

    categoryValidator(req: Request, res: Response, next: NextFunction): void {
        const { categoryName } = req.body;
        const validCategory = new CategoryDTO();
        validCategory.categoryName = categoryName;

        void validate(validCategory).then(errors => {
            if (errors.length > 0) {
                return this.httpResponse.Error(res, errors);
            } else {
                next();
            }
        });
    }
}
