export type Book = {
    _id?: string;
    title: string;
    author: string;
    journal_name: string;
    published_date: Date;
    publisher: string;
    volume: string;
    isbn: string;
    pages: string;
    updated_date: Date;
    status: string;
};

export const DefaultEmptyBook: Book = {
    _id: undefined, 
    title: '', 
    author: '',
    journal_name: '',
    published_date: new Date(),
    publisher: '',
    volume: '',
    isbn: '',
    pages: '',
    updated_date: new Date(),
    status: 'admin',
}

