import { Body, Controller, Get, Param, Post, Patch, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles(Role.Admin)
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity)
    )
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUser);
    return new ReturnUserDto(user);
  }

  @Roles(Role.Admin)
  @Get('/:userId')
  async findUserWithRelation(@Param() param: { userId: number }): Promise<ReturnUserDto> {
    const user = await this.userService.findUserWithRelation(param.userId);
    return new ReturnUserDto(user);
  }

  @UsePipes(ValidationPipe)
  @Roles(Role.User, Role.Admin)
  @Patch('/alterar-senha')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Request() req): Promise<void> {
    await this.userService.updatePassword(updatePasswordDto, req.user.sub);
  }
}
