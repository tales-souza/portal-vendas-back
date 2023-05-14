import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { Role } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Roles(Role.User, Role.Admin)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        const categories = await this.categoryService.findAllCategories();
        return categories.map((category) => new ReturnCategoryDto(category));
    }
}



