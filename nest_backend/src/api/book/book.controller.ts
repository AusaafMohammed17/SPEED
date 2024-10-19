import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { error } from 'console';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/test')
  test() {
    return this.bookService.test();
  }
  // Get all books
  @Get('/')
  async findAll() {
    try {
      return this.bookService.findAll();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Books found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Get one book via id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.bookService.findOne(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Book found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Find Books for Administration
  @Get('/book')
  async findForModeration(@Query('admin_status') admin_status: string) {
    try {
      console.log('something went wrong backend');

      const unsortedBooks =
        await this.bookService.findForModeration(admin_status);
      return unsortedBooks;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No books found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Create/add a book
  @Post('/')
  async addBook(@Body() createBookDto: CreateBookDto) {
    try {
      await this.bookService.create(createBookDto);
      return { message: 'Book added successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this book',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Update a book
  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      await this.bookService.update(id, createBookDto);
      return { message: 'Book updated successfully' };
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this book',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Delete a book via id
  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    try {
      return await await this.bookService.delete(id);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No such a book',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
