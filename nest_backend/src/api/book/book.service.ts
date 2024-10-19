import { Injectable } from '@nestjs/common';
import { Book } from './book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  test(): string {
    return 'book route testing';
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async findForModeration(status: string): Promise<Book[]> {
    if (status) {
      // MongoDB query to filter by status
      console.log('something went right');
      return await this.bookModel.find({ admin_status: 'status' }).exec();
    }
    // If no status is passed, return all books
    console.log('something went wrong');
    //return await this.bookModel.find().exec();
  }
  //{ admin_status: 'admin' }

  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto);
  }

  async update(id: string, createBookDto: CreateBookDto) {
    return await this.bookModel.findByIdAndUpdate(id, createBookDto).exec();
  }

  async delete(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    return deletedBook;
  }
}
