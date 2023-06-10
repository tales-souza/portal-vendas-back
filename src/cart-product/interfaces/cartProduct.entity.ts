import { CartEntity } from "src/cart/interfaces/cart.entity";
import { ProductEntity } from "src/product/interfaces/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cart_product'})
export class CartProductEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'cart_id', nullable: false })
    cartId: number;

    @Column({ name: 'product_id', nullable: false })
    productId: number;

    @Column({ name: 'amount', nullable: false })
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => CartEntity, (cart) => cart.cartProducts)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart?: CartEntity

    @ManyToOne(() => ProductEntity, (product) => product.cartProducts)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product?: ProductEntity


}