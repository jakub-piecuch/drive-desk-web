'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { ToolbarProps, View } from 'react-big-calendar';
import { useIsMobile } from '@/hooks/useBreakpoints';

const VIEW_LABELS: Record<string, string> = {
  month: 'Month',
  week: 'Week',
  threeDay: '3 Days',
  day: 'Day',
  agenda: 'Agenda',
};

const MOBILE_VIEWS: string[] = ['day', 'week', 'threeDay', 'month', 'agenda'];

export function CalendarToolbar({ view, views, label, onNavigate, onView }: ToolbarProps) {
  const isMobile = useIsMobile();
  const availableViews = isMobile ? MOBILE_VIEWS : (views as View[]);

  const viewToggle = (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, next: View) => next && onView(next)}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          px: { xs: 1.5, sm: 2 },
          py: 0.5,
          fontSize: '0.75rem',
          color: 'text.primary',
          borderColor: 'divider',
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          },
        },
      }}
    >
      {availableViews.map((v) => (
        <ToggleButton key={v} value={v}>
          {VIEW_LABELS[v] ?? v}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );

  const navRow = (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
      <IconButton onClick={() => onNavigate('PREV')} sx={{ color: 'text.primary' }}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography
        variant={isMobile ? 'body1' : 'h6'}
        fontWeight={600}
        sx={{ textTransform: 'capitalize', textAlign: 'center' }}
      >
        {label}
      </Typography>
      <IconButton onClick={() => onNavigate('NEXT')} sx={{ color: 'text.primary' }}>
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );

  if (isMobile) {
    return (
      <Box sx={{ mb: 1 }}>
        {navRow}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {viewToggle}
        </Box>
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={{ mb: 1 }}>
      {navRow}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {viewToggle}
      </Box>
    </Stack>
  );
}
