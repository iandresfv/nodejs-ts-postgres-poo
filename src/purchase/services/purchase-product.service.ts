import { type DeleteResult, type UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductEntity } from '../entities/purchases-products.entity';
import { ProductService } from '../../product/services/product.service';
import { type PurchaseProductDTO } from '../dto/purchase-product.dto';

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
    constructor(private readonly productService: ProductService = new ProductService()) {
        super(PurchaseProductEntity);
    }

    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
        const newPurchaseProduct = (await this.execRepository).create(body);
        const prod = await this.productService.findProductById(newPurchaseProduct.product.id);
        if (prod !== null) {
            newPurchaseProduct.totalPrice = prod?.price * newPurchaseProduct.quantityProduct;
        }
        return (await this.execRepository).save(newPurchaseProduct);
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updatePurchaseProduct(id: string, infoUpdate: PurchaseProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}
