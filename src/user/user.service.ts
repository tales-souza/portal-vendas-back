import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(createUserDto.password, saltOrRounds);

        /*verifica se o email já existe*/
        const userAlreadyExists = await this.findUserByMail(createUserDto.email);

        if (userAlreadyExists) {
            /* throw new HttpException({
                 status: HttpStatus.BAD_REQUEST,
                 error: "user already exists"
             }, HttpStatus.BAD_REQUEST,
             )*/

            throw new BadRequestException("user already exists");
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

    async findUserByMail(email: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOneBy({
            email: email
        })
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({
            id: userId
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user

    }

    async findUserWithRelation(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        });
        return user
    }
}
