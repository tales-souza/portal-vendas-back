import { Injectable } from '@nestjs/common';
import { StateEntity } from './interfaces/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'


@Injectable()
export class StateService {
    constructor(
        @InjectRepository(StateEntity)
        private readonly stateRepository: Repository<StateEntity>
    ) { }


    async getAllStates() : Promise<StateEntity[]>{
        return await this.stateRepository.find();
    }



}
