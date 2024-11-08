// src/app/form/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function ArticleSubmissionForm() {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors([]);
            setSuccessMessage('Article submitted successfully!');

            // Send form data to the API (mocked here)
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send form data as JSON
            });

            if (response.ok) {
                setSuccessMessage('Article submitted successfully!');
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
            } else {
                setSuccessMessage('Failed to submit article.');
            }
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