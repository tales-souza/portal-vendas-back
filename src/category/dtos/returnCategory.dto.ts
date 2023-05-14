import { CategoryEntity } from "../interfaces/category.entity";

export class ReturnCategoryDto {
    id: number;
    name: string;

    constructor(category: CategoryEntity) {
        this.id = category.id;
        this.name = category.name;
    }
}