import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './interfaces/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private categoryService: CategoryService
    ) { }

    async findAllProducts(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find({
            relations: {
                category: true
            }
        });

        if (!products || products.length === 0) {
            throw new NotFoundException(`products not found`);
        }

        return products;
    }
    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>{

        const categoryId = await this.categoryService.findCategoryById(createProductDto.categoryId);

        const product = await this.productRepository.save(createProductDto);
        return product;
    }
}
