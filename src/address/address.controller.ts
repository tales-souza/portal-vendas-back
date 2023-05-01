import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './interfaces/address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly adressService: AddressService) { }

    @Post('/:userId')
    async createAddress(@Body() createAddress: CreateAddressDto, @Param() param: { userId: number } ): Promise<AddressEntity> {
        const address = this.adressService.createAdress(createAddress, param.userId);
        return address;
    }
}
