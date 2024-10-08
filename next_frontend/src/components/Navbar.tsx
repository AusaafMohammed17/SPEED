import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/overview">Overview</Link></li>
        <li><Link href="/form">New Article</Link></li>
      </ul>
    </nav>
    
  );
};

export default Navbar;