import { Body, Controller, Param, Post, UseGuards, Request } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './interfaces/address.entity';
import { AddressService } from './address.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';

@Controller('address')
export class AddressController {
    constructor(private readonly adressService: AddressService) { }

    @Roles(Role.User)
    @Post()
    async createAddress(@Body() createAddress: CreateAddressDto, @Request() req): Promise<AddressEntity> {
        const address = this.adressService.createAdress(createAddress, req.user.sub);
        return address;
    }
}
