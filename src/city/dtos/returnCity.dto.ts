import { ReturnStateDto } from "../../state/dtos/returnState.dto"
import { CityEntity } from "../interfaces/city.entity";

export class ReturnCityDto {
    name: string;
    state: ReturnStateDto

    constructor(city: CityEntity){
        this.name = city.name;
        this.state = new ReturnStateDto(city.state);
        
    }

}