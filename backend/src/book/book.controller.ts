import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, fileFilter } from "../config/multer";
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('imageLink', {storage: storage.local, fileFilter: fileFilter}))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if(!file){
      throw new BadRequestException("file is not an image")
    }
    createBookDto.imageLink = file.filename
    return this.bookService.create(createBookDto);
  }

  @Get('/')
  findAll(@Query() query: { page: number, limit: number, title: string }) {
    return this.bookService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param() param: {id: string}) {
    return this.bookService.findOne(param.id);
  }

  @Put('/:id')
  update(@Param() param: { id: string }, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(param.id, updateBookDto);
  }

  @Delete('/:id')
  delete(@Param() param: { id: string }) {
    return this.bookService.delete(param.id);
  }

}
