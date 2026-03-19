// src/components/modules/layout/Layout.tsx
"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { OrgActivationGuard } from "@/components/layout/OrgActivationGuard";
import { useIsMobile } from "@/hooks/useBreakpoints";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "@clerk/nextjs";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const { orgId, isLoaded: authLoaded } = useAuth();

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

      <OrgActivationGuard />

      {!authLoaded || !orgId ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <AppSidebar />
          <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
            {isMobile && <Toolbar />}
            {children}
          </Box>
        </>
      )}
    </Box>
  );
};