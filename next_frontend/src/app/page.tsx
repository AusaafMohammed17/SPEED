// src/app/page.tsx
'use client';

import { useState } from 'react';

export default function HomePage() {
const [articles, setArticles] = useState<any[]>([]); // Adjust based on your article type

return (
<div>
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