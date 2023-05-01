import { IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    complement: string;

    @IsNumber()
    numberAddress: number;

    @IsString()
    cep: string;

    @IsNumber()
    cityId: number;
}
