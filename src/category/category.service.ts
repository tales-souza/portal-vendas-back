import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './interfaces/category.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>) { }

    async findAllCategories() : Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();
        if(!categories || categories.length === 0){
            throw new NotFoundException('categories not found');
        }
        return categories;
    }
}


