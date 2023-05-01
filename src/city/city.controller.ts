import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './interfaces/city.entity';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }
    @Get('/:stateId')
    async getAllCitiesByStateId(@Param() param: { stateId: number }
    ): Promise<CityEntity[]> {
        return this.cityService.getAllCitiesByStateId(param.stateId)
    }
}