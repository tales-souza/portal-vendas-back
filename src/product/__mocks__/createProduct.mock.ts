import { categoryMockEntity } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/createProduct.dto";

export const createProductMock: CreateProductDto = {
    image:'teste',
    name:'teste',
    price: 44,
    categoryId: categoryMockEntity.id,
}