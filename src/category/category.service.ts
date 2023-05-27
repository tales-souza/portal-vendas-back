import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './interfaces/category.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>) { }

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();
        if (!categories || categories.length === 0) {
            throw new NotFoundException('categories not found');
        }
        return categories;
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {

        const categoryAlreadyExists = await this.findCategoryByName(createCategoryDto.name).catch(() => undefined);

        if(categoryAlreadyExists){
            throw new BadRequestException(`Category name ${createCategoryDto.name} already exists`);
        }

        const category = await this.categoryRepository.save(createCategoryDto);
        return category;
    }


    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name
            }
        })

        if (!category) {
            throw new NotFoundException(`Category name ${name} not found`);
        }

        return category;
    }


}


