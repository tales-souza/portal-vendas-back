import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { signInDto } from './dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';




@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService
    ) { }

    async signIn({ email, pass }: signInDto): Promise<any> {
        const user = await this.userService.findUserByMail(email);

        if (!user) {
            throw new UnauthorizedException('Email or password inválid');
        }

        const isMatch = await compare(pass, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException('Email or password inválid');
        }
        /*const { password, ...result } = user;*/
        const payload = { typeUser: user.typeUser, sub: user.id }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: new ReturnUserDto(user)

        }
    }
}