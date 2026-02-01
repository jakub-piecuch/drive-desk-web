'use client';

import { PageHeader } from '@/components/elements/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, Formats, View } from 'react-big-calendar';
import { CreateEventModal } from './modules/CreateLessonEventModal';
import { useLessonEvents, useLessons } from './lesson.hooks';
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

const formats: Formats = {
  timeGutterFormat: 'HH:mm',        // Time on the left side of week/day view (e.g., "09:00", "14:30")
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
  selectRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
};

// Define your event type with proper typing
interface LessonEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  instructor?: string;
  trainee?: string;
  car?: string;
  type?: 'lesson' | 'exam' | 'meeting';
}

export default function Lessons() {
  const [isCreateLessonModalOpen, setIsCreateLessonmodalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);  // ADD THIS
  const [view, setView] = useState<View>('week');
  const [date, setDate] = useState(new Date());

  const { events, isLoading } = useLessonEvents();


  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log('Selected slot:', { start, end });
      setSelectedSlot({ start, end })
      setIsCreateLessonmodalOpen(true)
    },
    []
  );

  const handleSelectEvent = useCallback((event: LessonEvent) => {
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
    setSelectedSlot(null);
    setIsCreateLessonmodalOpen(true);
  };

  const eventStyleGetter = useCallback(
    (event: LessonEvent) => {
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
          title="Lessons"
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
        {/*  TODO: use for users */}
        {/* <a href='tel:+48123123123'>
        twoj numer!!!!
      </a> */}
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
          formats={formats}
          style={{ height: '100%' }}
        />
      </Box>

      <CreateEventModal
        isOpen={isCreateLessonModalOpen}
        onOpenChange={setIsCreateLessonmodalOpen}
        initialStartTime={selectedSlot?.start ?? null}
        initialEndTime={selectedSlot?.end ?? null}
      />
    </>
  );
}