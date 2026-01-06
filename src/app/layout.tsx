// src/app/layout.tsx
"use client";

import EmotionRegistry from "@/theme/EmotionRegistry";
import MuiThemeProvider from "@/theme/MuiThemeProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";
import { Toaster } from "sonner";
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <QueryClientProvider client={queryClient}>
            <MuiThemeProvider>
              {children}
              <Toaster position="top-right" richColors />
            </MuiThemeProvider>
          </QueryClientProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}