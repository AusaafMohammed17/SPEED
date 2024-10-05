// src/app/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journalName: '',
    year: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors.push(`${key} is required`);
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      setSuccessMessage('Article submitted successfully!');
      // Process form data (e.g., send to API or save)
      console.log('Form data submitted:', formData);
      setFormData({
        title: '',
        authors: '',
        journalName: '',
        year: '',
        volume: '',
        number: '',
        pages: '',
        doi: '',
      });
    }
  };

  return (
    <div>
      <h1>Article Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="authors">Authors</label>
        <input
          type="text"
          id="authors"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          required
        />

        <label htmlFor="journalName">Journal Name</label>
        <input
          type="text"
          id="journalName"
          name="journalName"
          value={formData.journalName}
          onChange={handleChange}
          required
        />

        <label htmlFor="year">Year of Publication</label>
        <input
          type="date"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <label htmlFor="volume">Volume</label>
        <input
          type="number"
          id="volume"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          required
        />

        <label htmlFor="number">Number</label>
        <input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />

        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          id="pages"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          required
        />

        <label htmlFor="doi">DOI</label>
        <input
          type="text"
          id="doi"
          name="doi"
          value={formData.doi}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}

      {successMessage && <p className="notification">{successMessage}</p>}
    </div>
  );
}
