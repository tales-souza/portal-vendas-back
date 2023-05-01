import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './interfaces/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly adressRepository: Repository<AddressEntity>
    ) { }


    async createAdress(address: CreateAddressDto, userId: number): Promise<AddressEntity> {
        return await this.adressRepository.save({
            ...address,
            userId
        })
    }
}


