"use client";

import './globals.css';
import Link from 'next/link';
import React, { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggles the side menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className="header-nav">
          <div></div>
          <div><h1>SPEED</h1></div>

          {/* Hamburger menu button */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          </div>
        </div>

        {/* Side menu sliding in from the right */}
        <div className={`side-menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><Link href="/book/moderate-book" onClick={() => setMenuOpen(false)}>Moderate Books</Link></li>
            <li><Link href="/book/create-book" onClick={() => setMenuOpen(false)}>Create a Book</Link></li>
            <li><Link href="/book" onClick={() => setMenuOpen(false)}>View Book List</Link></li>
          </ul>
        </div>

        <div className="container">{children}</div>
      </body>
    </html>
  );
}
