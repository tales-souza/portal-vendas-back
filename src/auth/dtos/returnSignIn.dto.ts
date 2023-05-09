import { ReturnUserDto } from "src/user/dtos/returnUser.dto";

export class ReturnSignInDto {
    acess_token: string;
    user: ReturnUserDto;
}