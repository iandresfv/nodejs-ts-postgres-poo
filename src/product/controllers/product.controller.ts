import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { ProductService } from '../services/product.service';
import { HttpResponse } from '../../shared/response/http.response';

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getProducts(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const products = await this.productService.findAllProducts();
            if (products.length === 0) {
                return this.httpResponse.NotFound(res, 'Products not found');
            }
            return this.httpResponse.Ok(res, products);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getProductById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const product = await this.productService.findProductById(id);
            if (product === null) {
                return this.httpResponse.NotFound(res, `Product with id ${id} not found`);
            }
            return this.httpResponse.Ok(res, product);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { body } = req;
            const data = await this.productService.createProduct(body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updateProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.productService.updateProduct(id, body);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update product. Product with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.productService.deleteProduct(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to delete product. Product with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
