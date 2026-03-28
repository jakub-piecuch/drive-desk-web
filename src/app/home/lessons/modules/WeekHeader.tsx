'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

interface HeaderProps {
  date: Date;
  label: string;
}

export function MonthHeader({ label }: { label: string }) {
  return (
    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem', fontWeight: 600 }}>
      {label}
    </Typography>
  );
}

export function WeekHeader({ date }: HeaderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.65rem' }}>
        {format(date, 'EEE')}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
        {format(date, 'd')}
      </Typography>
    </Box>
  );
}
