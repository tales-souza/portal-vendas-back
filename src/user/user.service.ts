import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { error } from 'console';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: createUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(createUserDto.password, saltOrRounds);

        /*verifica se o email já existe*/
        const userAlreadyExists = await this.getUserByMail(createUserDto.email);

        if (userAlreadyExists) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "user already exists"
            }, HttpStatus.BAD_REQUEST,
            )
        }

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHash,
            typeUser: 1
        })
    }


    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getUserByMail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOneBy({
            email: email
        })
    }
}
