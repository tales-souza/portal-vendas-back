import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './interfaces/cart.entity';
import { Repository } from 'typeorm';
import { InsertProductInCartDto } from './dtos/insertProductInCart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ) { }

    async findCartByUserId(userId: number, useRelations?: boolean): Promise<CartEntity> /* falta teste unitário*/ {
        const relations = useRelations ? {
            cartProducts: {
                product: true
            }
        } : undefined
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            relations: relations
        });
        if (!cart) {
            throw new NotFoundException(`user's cart ${userId} not found`)
        }

        return cart;
    }

    async createCart(userId: number): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId, false).catch(async () => {
            return await this.cartRepository.save({
                userId,
                active: true
            })
        });
        return cart;
    }

    async insertProductInCart(insertProductInCartDto: InsertProductInCartDto, userId: number): Promise<CartEntity> {
        const cart = await this.createCart(userId);
        const cartProduct = await this.cartProductService.insertProductInCart(insertProductInCartDto, cart);
        return cart
    }

    async clearCart(userId: number): Promise<void> {
        const cart = await this.findCartByUserId(userId);
        await this.cartRepository.save({
            ...cart,
            active: false
        })

    }
}
