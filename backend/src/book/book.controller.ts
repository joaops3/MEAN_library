import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService){}

  @Post("/")
  create(@Body() createBookDto: CreateBookDto){
    return this.bookService.create(createBookDto)
  }

  @Get("/")
  findAll(@Query() query: {name: string}){
    return this.bookService.findAll(query.name)
  }

  @Get("/:id")
  findOne(@Param() param){
    return this.bookService.findOne(param.id)
  }

  
}
