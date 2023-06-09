import { IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsNumber()
    categoryId: number;
}