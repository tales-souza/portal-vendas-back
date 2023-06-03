import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { DeleteResult } from 'typeorm';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Roles(Role.User, Role.Admin)
    @Get()
    async findAllProducts(): Promise<ReturnProductDto[]> {
        const products = await this.productService.findAllProducts();
        return products.map((product) => new ReturnProductDto(product));
    }

    @UsePipes(ValidationPipe)
    @Roles(Role.Admin)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) : Promise<ReturnProductDto>{
        const product = await this.productService.createProduct(createProductDto);
        return new ReturnProductDto(product);
    }

    @Roles(Role.Admin)
    @Delete('/:productId')
    async deleteProductById(@Param() param: { productId: number }) : Promise<DeleteResult> {
        const result = await this.productService.deleteProductById(param.productId);
        return result;
    }
}
