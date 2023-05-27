import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './interfaces/product.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ReturnProductDto } from './dtos/returnProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Roles(Role.User, Role.Admin)
    @Get()
    async findAllProducts(): Promise<ReturnProductDto[]> {
        const products = await this.productService.findAllProducts();
        return products.map((product) => new ReturnProductDto(product));
    }
}
