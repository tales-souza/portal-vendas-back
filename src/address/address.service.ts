import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './interfaces/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';



@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly adressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) { }

    async createAdress(address: CreateAddressDto, userId: number): Promise<AddressEntity> {

        const user = await this.userService.findUserById(userId);
        const city = await this.cityService.findCityById(address.cityId);

        return await this.adressRepository.save({
            ...address,
            userId: user.id
        });
    }

    async findAddressesByUserId(userId: number): Promise<AddressEntity[]> {
        const addresses = await this.adressRepository.find({
            where: {
                userId
            },
            relations:
            {
                city: {
                    state: true
                }
            }
        });
        if (!addresses || addresses.length === 0) {
            throw new NotFoundException(` Not Found addresses for userId: ${userId}`);
        }
        return addresses;
    }
}


