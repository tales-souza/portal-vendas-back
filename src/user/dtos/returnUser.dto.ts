import { ReturnAddressDto } from "src/address/dtos/returnAddress.dto";
import { UserEntity } from "../interfaces/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    typeUser: number;
    addresses?: ReturnAddressDto[]

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.cpf = userEntity.cpf;
        this.typeUser = userEntity.typeUser
        this.addresses = userEntity.addresses ? userEntity.addresses.map((address) => new ReturnAddressDto(address)) : undefined
    }
}
