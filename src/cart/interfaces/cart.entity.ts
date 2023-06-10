import {  CartProductEntity } from "src/cart-product/interfaces/cartProduct.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'active' })
    active: Boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
    cartProducts?: CartProductEntity[]

    
}