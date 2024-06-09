import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import the global styles
import LoadingWrapper from './LoadingWrapper'; // Import the LoadingWrapper component
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vendito",
  description: "Vendito is a marketplace for buying and selling items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>
        <AuthProvider> {/* Wrap your component's content with the AuthProvider */}
          <LoadingWrapper>
            {children}
          </LoadingWrapper>
        </AuthProvider>
        </body>
      </html>
  );
}
