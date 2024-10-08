import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/about"><a>About</a></Link></li>
        <li><Link href="/form"><a>New Article</a></Link></li>
      </ul>
    </nav>
    
  );
};

export default Navbar;