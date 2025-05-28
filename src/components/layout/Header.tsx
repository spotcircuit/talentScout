import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          DevLink
        </Link>
        <nav>
          <Link href="/companies" className="px-3 py-2 hover:bg-gray-700 rounded">
            Companies
          </Link>
          <Link href="/talent" className="px-3 py-2 hover:bg-gray-700 rounded">
            Talent
          </Link>
          <Link href="/jobs" className="px-3 py-2 hover:bg-gray-700 rounded">
            Jobs
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
