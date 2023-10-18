import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { PurchaseEntity } from '../../purchase/entities/purchase.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
    @Column()
    address!: string;

    @Column()
    dni!: string;

    @OneToOne(() => UserEntity, user => user.customer, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;

    @OneToMany(() => PurchaseEntity, purchase => purchase.customer)
    purchases!: PurchaseEntity[];
}
