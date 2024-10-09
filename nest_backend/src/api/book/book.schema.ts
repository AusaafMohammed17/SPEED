import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
export type BookDocument = HydratedDocument<Book>;
@Schema()
export class Book {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  author: string;
  @Prop()
  journal_name: string;
  @Prop({ type: Date })
  published_date: Date;
  @Prop()
  publisher: string;
  @Prop()
  volume: string;
  @Prop({ required: true })
  isbn: string;
  @Prop()
  pages: string;
  @Prop({ type: Date })
  updated_date: Date;
}
export const BookSchema = SchemaFactory.createForClass(Book);
