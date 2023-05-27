import { categoryMockEntity } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../interfaces/product.entity";

export const productMock: ProductEntity = {
    id: 1,
    image:'teste',
    name:'teste',
    price: 44,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: categoryMockEntity.id,
    
}