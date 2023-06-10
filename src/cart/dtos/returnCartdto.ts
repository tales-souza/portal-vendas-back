import { CartEntity } from "../interfaces/cart.entity";
import { ReturnCartProductsDto } from "src/cart-product/dtos/returnCartProducts.dto";

export class ReturnCartDto {
    id: number;
    cartProducts: ReturnCartProductsDto[];

    constructor(cart: CartEntity){
        this.id = cart.id;
        this.cartProducts = cart.cartProducts ? cart.cartProducts.map((cartProducts) => new ReturnCartProductsDto(cartProducts)) : undefined
    }

}