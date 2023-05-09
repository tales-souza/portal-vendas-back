import { Body, Controller, Param, Post, UseGuards, Request } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './interfaces/address.entity';
import { AddressService } from './address.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('address')
export class AddressController {
    constructor(private readonly adressService: AddressService) { }

    @UseGuards(AuthGuard)
    @Post()
    async createAddress(@Body() createAddress: CreateAddressDto, @Request() req): Promise<AddressEntity> {
        const address = this.adressService.createAdress(createAddress, req.user.sub);
        return address;
    }
}
