import { NextResponse } from 'next/server';

let articles: any[] = []; // This will hold the submitted articles in memory

export async function GET() {
  return NextResponse.json(articles); // Return the articles as JSON
}

export async function POST(request: Request) {
  const body = await request.json(); // Parse the incoming JSON data
  articles.push(body); // Add the new article to the articles array
  return NextResponse.json({ message: 'Article submitted successfully!' }, { status: 201 });
}
