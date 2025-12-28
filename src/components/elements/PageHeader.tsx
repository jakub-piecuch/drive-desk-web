// src/components/elements/PageHeader.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  actions,
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
      >
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight={700}
            gutterBottom
            fontSize={35}
            color='white'
          >
            {title}
          </Typography>
          {description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
            >
              {description}
            </Typography>
          )}
        </Box>
        
        {actions && (
          <Stack 
            direction="row" 
            spacing={1.5}
            sx={{ 
              mt: { xs: 2, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}