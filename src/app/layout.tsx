"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { useState } from "react";
import './globals.css';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/ThemeConfig";
import MuiThemeProvider from "@/theme/MuiThemeProvider";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider>
            {children}
            <Toaster position="top-right" theme="light" />
          </MuiThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}