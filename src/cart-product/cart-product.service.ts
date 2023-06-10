import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './interfaces/cartProduct.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertProductInCartDto } from 'src/cart/dtos/insertProductInCart.dto';
import { CartEntity } from 'src/cart/interfaces/cart.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService

    ) { }

    async findCartProduct(cartId: number, productId: number): Promise<CartProductEntity> {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                cartId,
                productId
            }
        });
        if (!cartProduct) {
            throw new NotFoundException(`cartProduct not found`);
        }
        return cartProduct;
    }

    async createCartProduct(insertProductInCart: InsertProductInCartDto, cartId: number): Promise<CartProductEntity> {
        await this.productService.findProductById(insertProductInCart.productId);
        const cartProduct = await this.cartProductRepository.save({
            ...insertProductInCart,
            cartId
        });
        return cartProduct;
    }

    async insertProductInCart(insertProductInCart: InsertProductInCartDto, cart: CartEntity): Promise<CartProductEntity> {
        const cartProduct = await this.findCartProduct(cart.id, insertProductInCart.productId).catch(() => undefined);

        if (!cartProduct) {
            return await this.createCartProduct(insertProductInCart, cart.id);
        }

        await this.productService.findProductById(insertProductInCart.productId);
        return await this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + insertProductInCart.amount
        });
    }

    async deleteProductInCart(productId: number, cartId: number): Promise<DeleteResult> {
        const cartProduct = await this.findCartProduct(cartId, productId);
        return await this.cartProductRepository.delete({ id: cartProduct.id });
    }


}
