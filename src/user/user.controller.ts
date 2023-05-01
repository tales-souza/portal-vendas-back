import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return this.userService.createUser(createUser)
  }
}
