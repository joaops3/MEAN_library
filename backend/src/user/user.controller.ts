import { Controller, Post, Body, Get, Param, Put, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { BookService } from "../book/book.service";
import { BuyBookDto } from "../book/dto/buy-book.dto";
import { UserService } from "./user.service";
import { CreateUserDto } from "./userDto/create-user.dto";
import { UpdateUserDto } from "./userDto/update-user.dto";


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param() param: { id: string }) {
    return this.userService.findOne(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(@Param() param: { id: string }, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.update(param.id, updateUserDto);
    if (!user) {
      return { error: 'user not found' };
    }
    return user;
  }

  @Post('/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/buy')
  async buyBook(
    @Param() param: { id: string },
    @Body() buyBookDto: BuyBookDto[],
  ) {
    const books = await this.bookService.findToBuy(buyBookDto);
    return this.userService.addBook(param.id, books);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async removeBook(
    @Param() param: { id: string },
    @Body() bookId: {id: string},
  ) {
    return this.userService.removeBook(param.id, bookId.id);
  }
}
