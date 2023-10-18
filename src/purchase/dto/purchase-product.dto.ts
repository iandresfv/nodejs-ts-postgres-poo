import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { ProductEntity } from '../../product/entities/product.entity';
import { PurchaseEntity } from '../entities/purchase.entity';

export class PurchaseProductDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number;

    @IsOptional()
    totalPrice?: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}
