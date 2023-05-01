import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { signInDto } from './dtos/signInDto';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService
    ) { }

    async signIn({ email, pass }: signInDto): Promise<any> {
        const user = await this.userService.getUserByMail(email);
        const isMatch = await compare(pass, user?.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        /*const { password, ...result } = user;*/
        const payload = { email: user.email, sub: user.id }

        return {
            acess_token: await this.jwtService.signAsync(payload)
        }
    }
}