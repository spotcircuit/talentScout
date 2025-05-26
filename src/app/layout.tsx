import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApolloProvider from '@/components/providers/ApolloProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TalentScout - Find Companies and Talent',
  description: 'A platform for searching and connecting with companies and talent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ApolloProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}
