import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { CreateUserDto } from "./userDto/create-user.dto";
import { UpdateUserDto } from "./userDto/update-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param() param: {id: string}) {
    return this.userService.findOne(param.id);
  }

  @Put("/:id")
  update(@Param() param, @Body() updateUserDto: UpdateUserDto){
    
    const user = this.userService.update(param.id, updateUserDto)
    if(!user){
      return {error: "user not found"}
    }
    return user
  }

  @Post('/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
