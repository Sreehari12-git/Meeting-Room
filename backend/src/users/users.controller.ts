import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller("admin")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("create-user")
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get("get-all")
  getAllUser() {
    return this.usersService.getAllUsers();
  }

  @Delete("user/:email")
  deleteUser(@Param("email") email: string) {
    return this.usersService.deleteUser(email);
  }

  @Put("user/:email")
  updateUser(@Param("email") email: string,@Body() body: any) {
    return this.usersService.updateUser(
      email,
      body
    );
  }

  @Post("createRooms")
  createRoom(@Body() body: any) {
    return this.usersService.createRooms(body);
  }

  @Get("getRooms")
  getAllRooms() {
    return this.usersService.getRooms();
  }

  @Delete("room/:name")
  deleteRoom(@Param("name") name : string) {
    return this.usersService.deleteRooms(name);
  }

  @Put("room/:name")
  updateRoom(@Param("name") name: string,@Body() body: any) {
    return this.usersService.updateRooms(
      name,
      body
    );
  }
}

