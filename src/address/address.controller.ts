import { Body, Controller, Param, Post, UseGuards, Request, Get } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './interfaces/address.entity';
import { AddressService } from './address.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(Role.User, Role.Admin)
@Controller('address')
export class AddressController {
    constructor(private readonly adressService: AddressService) { }

    @Post()
    async createAddress(@Body() createAddress: CreateAddressDto, @Request() req): Promise<AddressEntity> {
        const address = this.adressService.createAdress(createAddress, req.user.sub);
        return address;
    }

    @Get()
    async findAddressesByUserId(@Request() req): Promise<ReturnAddressDto[]> {
        const addresses = await this.adressService.findAddressesByUserId(req.user.sub);
        const addressesMap =  addresses.map((adrress) =>  new ReturnAddressDto(adrress));
        return addressesMap;
    }

}
