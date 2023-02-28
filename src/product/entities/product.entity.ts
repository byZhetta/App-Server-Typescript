import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BaseEntity } from "../../config/base.entity";
import { PurchaseProductEntity } from "../../custom/entities/purchases-products.entity";

@Entity({name: "product"})
export class ProductEntity extends BaseEntity {
    @Column()
    productName!: string;
    
    @Column()
    description!: string;

    @Column()
    price!: string;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category!: CategoryEntity;

    @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.product)
    purchaseProduct!: PurchaseProductEntity[];
}