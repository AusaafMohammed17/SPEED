// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';

// Define an Article type
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

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]); // Use the defined Article type

  // Fetch articles from the API when the component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <header className="header">
      </header>

      <h1>Article Submission</h1>
      <div className="label-container">
        <label>Title</label>
        <label>Authors</label>
        <label>Journal Name</label>
        <label>Year of Publication</label>
        <label>Volume</label>
        <label>Number</label>
        <label>Pages</label>
        <label>DOI</label>
      </div>

      {articles.length > 0 ? (
        <ul className="article-list">
          {articles.map((article, index) => (
            <li key={index} className="article-item">
              <h3>{article.title}</h3>
              <p><strong>Authors:</strong> {article.authors}</p>
              <p><strong>Journal:</strong> {article.journalName}, {article.year}</p>
              <p><strong>Volume:</strong> {article.volume}, <strong>Number:</strong> {article.number}, <strong>Pages:</strong> {article.pages}</p>
              <p><strong>DOI:</strong> {article.doi}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles submitted yet.</p>
      )}
    </div>
  );
}
