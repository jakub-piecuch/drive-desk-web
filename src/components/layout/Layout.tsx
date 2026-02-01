// src/components/modules/layout/Layout.tsx
"use client";

import Box from "@mui/material/Box";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useIsMobile } from "@/hooks/useBreakpoints";
import Toolbar from "@mui/material/Toolbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

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
        {isMobile && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
};