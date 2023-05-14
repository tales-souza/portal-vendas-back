import { ReturnCityDto } from "../../city/dtos/returnCity.dto";
import { AddressEntity } from "../interfaces/address.entity";

export class ReturnAddressDto {
    complement: string;
    numberAddress: number;
    cep: string;
    city?: ReturnCityDto;
    
    constructor(address: AddressEntity) {
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
        this.city = address.city ? new ReturnCityDto(address.city) : undefined;
    }
}
