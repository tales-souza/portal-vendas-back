import { Controller, Get, Post, UsePipes, ValidationPipe, Body} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/returnCategory.dto';
import { Role } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CreateCategoryDto } from './dtos/createCategory.dto';


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }


    @Roles(Role.User, Role.Admin)
    @Get()
    async findAllCategories(): Promise<ReturnCategoryDto[]> {
        const categories = await this.categoryService.findAllCategories();
        return categories.map((category) => new ReturnCategoryDto(category));
    }
     
    @UsePipes(ValidationPipe)
    @Roles(Role.Admin)
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ReturnCategoryDto>{
        const category = await this.categoryService.createCategory(createCategoryDto);
        return category;
    }
}



