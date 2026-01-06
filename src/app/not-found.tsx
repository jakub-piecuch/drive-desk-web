'use client';

import { Box, Typography, Button } from '@mui/material';
import { Home as HomeIcon, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';

/**
 * Global 404 Not Found Page WITH Sidebar
 * 
 * This wraps the 404 content in your Layout component so users can:
 * 1. See the sidebar and navigate to other parts of the app
 * 2. Have a consistent look and feel
 * 
 * Replace your src/app/not-found.tsx with this file.
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
            fontWeight: 700,
            color: 'text.secondary',
            mb: 2,
            letterSpacing: '-0.02em'
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: 500
          }}
        >
          The page you're looking for doesn't exist or has been moved. Use the sidebar to navigate or go back to the dashboard.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            size="large"
          >
            Go Back
          </Button>
          
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => router.push('/home/dashboard')}
            size="large"
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}