import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dtos/signIn.dto';
import { ReturnSignInDto } from './dtos/returnSignIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async signIn(@Body() signIn: signInDto): Promise<ReturnSignInDto>{
        return this.authService.signIn(signIn);
    }



}
