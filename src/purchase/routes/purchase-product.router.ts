import { BaseRouter } from '../../shared/router/router';
import { PurchaseProductController } from '../controllers/purchase-product.controller';
import { PurchaseProductMiddleware } from '../middlewares/purchase-product.middleware';

export class PurchaseProductRouter extends BaseRouter<
    PurchaseProductController,
    PurchaseProductMiddleware
> {
    constructor() {
        super(PurchaseProductController, PurchaseProductMiddleware);
    }

    routes(): void {
        this.router.get('/purchaseproducts', async (req, res) =>
            this.controller.getPurchaseProducts(req, res),
        );
        this.router.post(
            '/purchaseproducts',
            async (req, res, next) => this.middleware.purchaseProductValidator(req, res, next),
            async (req, res) => this.controller.createPurchaseProduct(req, res),
        );
        this.router.get('/purchaseproducts/:id', async (req, res) =>
            this.controller.getPurchaseProductById(req, res),
        );
        this.router.put('/purchaseproducts/:id', async (req, res) =>
            this.controller.updatePurchaseProduct(req, res),
        );
        this.router.delete('/purchaseproducts/:id', async (req, res) =>
            this.controller.deletePurchaseProduct(req, res),
        );
    }
}
