import { type Request, type Response } from 'express';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseService } from '../services/purchase.service';

export class PurchaseController {
    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {}

    async getPurchases(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const purchases = await this.purchaseService.findAllPurchases();
            if (purchases.length === 0) {
                return this.httpResponse.NotFound(res, 'Purchases not found');
            }
            return this.httpResponse.Ok(res, purchases);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async getPurchaseById(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const purchase = await this.purchaseService.findPurchaseById(id);
            if (purchase === null) {
                return this.httpResponse.NotFound(res, `Purchase with id ${id} not found`);
            }
            return this.httpResponse.Ok(res, purchase);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async createPurchase(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { body } = req;
            const data = await this.purchaseService.createPurchase(body);
            return this.httpResponse.Created(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async updatePurchase(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const {
                body,
                params: { id },
            } = req;
            const data: UpdateResult = await this.purchaseService.updatePurchase(id, body);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to update purchase. Purchase with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async deletePurchase(req: Request, res: Response): Promise<Response | undefined> {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseService.deletePurchase(id);
            if (data.affected === 0) {
                return this.httpResponse.NotFound(
                    res,
                    `Unable to purchase user. Purchase with id ${id} not found`,
                );
            }
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
