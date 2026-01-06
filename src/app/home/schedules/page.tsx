'use client';

import { PageHeader } from '@/components/elements/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, View } from 'react-big-calendar';
// ↑ This was overriding your ThemeConfig styles! All calendar styling is in ThemeConfig.ts

// Configure date-fns localizer (moved outside component to prevent recreation)
const locales = {
  'en-US': enUS,
};

// ✅ FIXED: Localizer is now created once, not on every render
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define your event type with proper typing
interface ScheduleEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  instructor?: string;
  trainee?: string;
  car?: string;
  type?: 'lesson' | 'exam' | 'meeting';
}

export default function Schedules() {
  const [view, setView] = useState<View>('week');
  const [date, setDate] = useState(new Date());

  // Mock events - replace with your actual data fetching
  const events: ScheduleEvent[] = useMemo(() => [
    {
      id: '1',
      title: 'Driving Lesson - John Doe',
      start: new Date(2026, 0, 6, 10, 0),
      end: new Date(2026, 0, 6, 11, 30),
      instructor: 'Mike Smith',
      trainee: 'John Doe',
      car: 'Toyota Corolla',
      type: 'lesson',
    },
    {
      id: '2',
      title: 'Exam - Jane Smith',
      start: new Date(2026, 0, 8, 14, 0),
      end: new Date(2026, 0, 8, 15, 0),
      type: 'exam',
    },
    {
      id: '3',
      title: 'Staff Meeting',
      start: new Date(2026, 0, 7, 9, 0),
      end: new Date(2026, 0, 7, 10, 0),
      type: 'meeting',
    },
  ], []);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log('Selected slot:', { start, end });
      // TODO: Open your modal to create a new event here
      alert(`Create event from ${start.toLocaleString()} to ${end.toLocaleString()}`);
    },
    []
  );

  const handleSelectEvent = useCallback((event: ScheduleEvent) => {
    console.log('Selected event:', event);
    // TODO: Open modal to view/edit event details
    alert(`Event: ${event.title}\nType: ${event.type || 'unknown'}`);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  const handleCreateEventClick = () => {
    // TODO: Open your create event modal
    alert('Create Event Modal - implement this');
  };

  const eventStyleGetter = useCallback(
    (event: ScheduleEvent) => {
      // Use colors that match your ThemeConfig
      let backgroundColor = '#3174ad'; // Default blue

      switch (event.type) {
        case 'lesson':
          backgroundColor = '#3c8843'; // Your theme green (matches ThemeConfig)
          break;
        case 'exam':
          backgroundColor = '#d32f2f'; // Red for exams
          break;
        case 'meeting':
          backgroundColor = '#f57c00'; // Orange for meetings
          break;
      }

      return {
        style: {
          backgroundColor,
          borderRadius: '4px',
          opacity: 0.9,
          color: 'white',
          border: '0px',
          display: 'block',
        },
      };
    },
    []
  );

  return (
    <>
      <Box sx={{ 
        p: 3, 
        pb: 0, 
        mb: -2 
      }}>
        <PageHeader
          title="Schedules"
          actions={
            <>
              <Button
                variant="contained"
                onClick={handleCreateEventClick}
              >
                <AddIcon sx={{ mr: 1 }} />
                Add Event
              </Button>
            </>
          }
        />
      </Box>

      <Box sx={{
        p: { xs: 3, sm: 3 },
        height: 'calc(100vh - 100px)',
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          date={date}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day', 'agenda']}
          step={30}
          showMultiDayTimes
          defaultDate={new Date()}
          style={{ height: '100%' }}
        />
      </Box>
    </>
  );
}