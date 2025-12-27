// src/components/modules/layout/Layout.tsx
"use client";

import Box from "@mui/material/Box";
import { AppSidebar } from "@/components/layout/AppSidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {/* Optional: Subtle background pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, #666 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <AppSidebar />
      
      <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};