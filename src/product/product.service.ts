import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './interfaces/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/updateProduct.dto';

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
    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(createProductDto.categoryId);
        const product = await this.productRepository.save(createProductDto);
        return product;
    }

    async findProductById(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                id: productId
            }
        });
        if (!product) {
            throw new NotFoundException(`product ${productId} not found`);
        }
        return product;
    }

    async deleteProductById(productId: number) : Promise<DeleteResult> {
        await this.findProductById(productId);
        return await this.productRepository.delete({ id: productId });
    }

    async updateProductById(updateProductDto: UpdateProductDto, productId: number): Promise<ProductEntity>{
        const product = await this.findProductById(productId);
        return await this.productRepository.save({
            ...product,
            ...updateProductDto
        });
    }
}
