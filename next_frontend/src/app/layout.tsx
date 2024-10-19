// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="header-nav">
          <Link href="/book" className="header-button">Books</Link>
          <div>SPEED</div>
          <Link href="/book/create-book" className="header-button">Add New Book</Link>
        </div>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
