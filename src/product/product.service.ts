import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './interfaces/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
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
}
