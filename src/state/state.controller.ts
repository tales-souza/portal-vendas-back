import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {

    constructor(private readonly stateService: StateService) { }
    @Get()
    async getAllStatese() {
        return this.stateService.getAllStates()
    }

}
