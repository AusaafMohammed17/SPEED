import { NextResponse } from 'next/server';

// Define an interface for the Article
interface Article {
  title: string;
  authors: string;
  journalName: string;
  year: number;
  volume: number;
  number: number;
  pages: string;
  doi: string;
}

// Function to fetch articles from the backend
async function fetchArticlesFromBackend(query: string, field: keyof Article): Promise<Article[]> {
  const response = await fetch(`http://your-backend-url/api/articles?query=${query}&field=${field}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles from backend');
  }
  return response.json();
}

// GET endpoint to retrieve all articles
export async function GET() {
  const articles = await fetchArticlesFromBackend('', 'title'); // Fetch all articles using 'title' as the default field
  return NextResponse.json(articles); // Return the articles as JSON
}

// POST endpoint to search articles
export async function POST(request: Request) {
  const { query, field } = await request.json(); // Parse the incoming JSON data

  // Validate the query and field
  if (!query || !field) {
    return NextResponse.json({ message: 'Invalid search data!' }, { status: 400 });
  }

  try {
    const articles = await fetchArticlesFromBackend(query, field as keyof Article); // Fetch filtered articles
    return NextResponse.json(articles); // Return the filtered articles as JSON
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}