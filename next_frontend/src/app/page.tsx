"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar'; // Adjust the path if necessary
import BookCard from '../components/BookCard'; // Adjust the path if necessary

// Define an Article type
interface Article {
  title: string;
  authors: string;
  journalName: string;
  year: number;
  volume: number;
  number: number;
  pages: number;
  doi: string;
  author: string;
  journal_name: string;
  published_date: string;
  publisher: string;
  isbn: string;
  description: string;
  updated_date: string;
  status: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Fetch articles from the API when the component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = async (query: string, field: keyof Article) => {
    const response = await fetch('/api/articles/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, field }),
    });

    if (response.ok) {
      const data = await response.json();
      setFilteredArticles(data);
    }
  };

  const articleList =
    filteredArticles.length === 0
      ? 'There is no article record!'
      : filteredArticles.map((article, k) => {
          const book = {
            ...article,
            volume: article.volume.toString(),
            pages: article.pages.toString(),
            published_date: new Date(article.published_date),
            updated_date: new Date(article.updated_date),
          };
          return <BookCard book={book} key={k} />;
        });

  return (
    <div className='ShowArticleList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Articles List</h2>
          </div>
          <div className='col-md-11'>
            <Link
              href='/article/create-article'
              className='btn btn-outline-warning float-right'
            >
              + Add New Article
            </Link>
          </div>
          <div className='col-md-12'>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className='row'>
          {articleList}
        </div>
      </div>
    </div>
  );
}