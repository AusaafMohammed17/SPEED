import { Date } from 'mongoose';

export class CreateBookDto {
  title: string;
  author: string;
  journal_name: string;
  published_date: Date;
  publisher: string;
  volume: string;
  isbn: string;
  pages: string;
  update_date: Date;
}
