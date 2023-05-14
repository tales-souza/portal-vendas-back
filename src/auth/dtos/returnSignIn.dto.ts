import { ReturnUserDto } from "src/user/dtos/returnUser.dto";

export class ReturnSignInDto {
    acessToken: string;
    user: ReturnUserDto;
}