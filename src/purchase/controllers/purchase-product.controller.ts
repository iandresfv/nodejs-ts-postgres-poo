import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { PurchaseProductService } from '../services/purchase-product.service';
import { HttpResponse } from '../../shared/response/http.response';

export class PurchaseProductController {
    constructor(
        private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getPurchaseProducts(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const purchasesProducts = await this.purchaseProductService.findAllPurchaseProducts();
            if (purchasesProducts.length === 0) {
                return this.httpResponse.NotFound(res, 'purchases-products not found');
            }
            return this.httpResponse.Ok(res, purchasesProducts);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getPurchaseProductById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const purchaseProduct = await this.purchaseProductService.findPurchaseProductById(id);
            if (purchaseProduct === null) {
                return this.httpResponse.NotFound(res, `purchase-product with id ${id} not found`);
            }
            return this.httpResponse.Ok(res, purchaseProduct);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createPurchaseProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { body } = req;
            const data = await this.purchaseProductService.createPurchaseProduct(body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updatePurchaseProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(
                id,
                body,
            );
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update purchase-product. Purchase-product with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deletePurchaseProduct(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to delete purchase-product. Purchase-product with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
