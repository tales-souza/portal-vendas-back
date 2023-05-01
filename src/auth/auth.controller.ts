import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dtos/signInDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async signIn(@Body() signIn: signInDto){
        return this.authService.signIn(signIn)
    }



}
