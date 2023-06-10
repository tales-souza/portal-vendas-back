import { CartProductEntity } from "../interfaces/cartProduct.entity";
import { ReturnProductDto } from "src/product/dtos/returnProduct.dto";

export class ReturnCartProductsDto {

    id: number;
    amount: number;
    product: ReturnProductDto

    constructor(cartProductsEntity: CartProductEntity) {
        this.id = cartProductsEntity.id
        this.amount = cartProductsEntity.amount
        this.product = cartProductsEntity.product ? new ReturnProductDto(cartProductsEntity.product) : undefined
    }

}