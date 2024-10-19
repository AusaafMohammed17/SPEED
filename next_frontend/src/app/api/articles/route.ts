import { NextResponse } from 'next/server';

// Define an interface for the Article
interface Article {
  title: string;
  authors: string;
  journalName: string;
  year: number; // Assuming year is a number
  volume: number;
  number: number;
  pages: number;
  doi: string;
}

// Use const instead of let for the articles array
const articles: Article[] = []; // This will hold the submitted articles in memory

// GET endpoint to retrieve all articles
export async function GET() {
  return NextResponse.json(articles); // Return the articles as JSON
}

// POST endpoint to submit a new article
export async function POST(request: Request) {
  const body: Article = await request.json(); // Parse the incoming JSON data

  // Optionally, you can perform validation here
  if (!body.title || !body.authors || !body.journalName) {
    return NextResponse.json({ message: 'Invalid article data!' }, { status: 400 });
  }

  articles.push(body); // Add the new article to the articles array
  return NextResponse.json({ message: 'Article submitted successfully!' }, { status: 201 });
}

// GET endpoint to search articles
export async function SEARCH(request: Request) {
  const { query, field } = await request.json(); // Parse the incoming JSON data

  // Validate the query and field
  if (!query || !field) {
    return NextResponse.json({ message: 'Invalid search data!' }, { status: 400 });
  }

  // Filter articles based on the query and field
  const filteredArticles = articles.filter(article =>
    article[field as keyof Article]?.toString().toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredArticles); // Return the filtered articles as JSON
}