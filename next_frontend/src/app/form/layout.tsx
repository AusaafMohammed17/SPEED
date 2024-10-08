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
                    <Link href="/" className="header-button">Home</Link>
                    <div>SPEED</div>
                    <Link href="/form" className="header-button">New Article</Link>
                </div>
                <div className="container">{children}</div>
            </body>
        </html>
    );
}
