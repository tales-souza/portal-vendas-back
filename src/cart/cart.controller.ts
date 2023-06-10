import { Controller, ValidationPipe, UsePipes, Post, Body, Request, Get, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { InsertProductInCartDto } from './dtos/insertProductInCart.dto';
import { ReturnCartDto } from './dtos/returnCartdto';
import { DeleteResult } from 'typeorm';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @UsePipes(ValidationPipe)
    @Roles(Role.Admin, Role.User)
    @Post()
    async inserProductInCart(@Body() insertProductInCart: InsertProductInCartDto, @Request() req): Promise<ReturnCartDto> {
        const cart = await this.cartService.insertProductInCart(insertProductInCart, req.user.sub);
        return new ReturnCartDto(cart);
    }

    @Roles(Role.Admin, Role.User)
    @Get()
    async findCartByUserId(@Request() req): Promise<ReturnCartDto> {
        const cart = await this.cartService.findCartByUserId(req.user.sub, true)
        return new ReturnCartDto(cart)
    }

    @Roles(Role.Admin, Role.User)
    @Delete()
    async clearCart(@Request() req): Promise<void> {
        const cart = await this.cartService.clearCart(req.user.sub)
    }

    @Roles(Role.Admin, Role.User)
    @Delete('product/:productId')
    async deleteProductInCart(@Request() req, @Param() param: { productId: number }): Promise<DeleteResult> {
        return await this.cartService.deleteProductInCart(param.productId, req.user.sub)
    }


}
