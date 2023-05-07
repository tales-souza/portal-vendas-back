import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity)
    )
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUser);
    return new ReturnUserDto(user);
  }


  @Get('/:userId')
  async findUserWithRelation(@Param() param: { userId: number }): Promise<ReturnUserDto> {
    const user = await this.userService.findUserWithRelation(param.userId);
    return new ReturnUserDto(user);

  }


}
