'use client';

import { PageHeader } from '@/components/elements/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useCallback, useState } from 'react';
import { Calendar, dateFnsLocalizer, Formats, View } from 'react-big-calendar';
import { CalendarToolbar } from './modules/CalendarToolbar';
import { MonthHeader, WeekHeader } from './modules/WeekHeader';
import { ThreeDayView } from './modules/ThreeDayView';
import { CreateEventModal } from './modules/CreateLessonEventModal';
import { LessonEventDrawer } from './modules/LessonEventDrawer';
import { useLessonEvents } from './lesson.hooks';
import { LessonEvent } from './lesson.types';
import { useIsMobile } from '@/hooks/useBreakpoints';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const formats: Formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
  selectRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer?.format(start, 'HH:mm', culture)} - ${localizer?.format(end, 'HH:mm', culture)}`,
};

export default function Lessons() {
  const isMobile = useIsMobile();
  const [isCreateLessonModalOpen, setIsCreateLessonmodalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<LessonEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
  const [view, setView] = useState<View>(isMobile ? 'day' : 'week');
  const [date, setDate] = useState(new Date());

  const { events } = useLessonEvents();

  const handleSelectSlot = useCallback(({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setIsCreateLessonmodalOpen(true);
  }, []);

  const handleCalendarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.rbc-event, .rbc-toolbar, .rbc-time-header, .rbc-show-more')) return;
    if (!target.closest('.rbc-time-content, .rbc-month-row')) return;

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const slotEl = elements.find(el => el.hasAttribute('data-slot-time')) as HTMLElement | undefined;
    if (!slotEl?.dataset.slotTime) return;

    const start = new Date(slotEl.dataset.slotTime);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    handleSelectSlot({ start, end });
  }, [handleSelectSlot]);

  const handleSelectEvent = useCallback((event: LessonEvent) => {
    setSelectedEvent(event);
    setIsEventDrawerOpen(true);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => setDate(newDate), []);
  const handleViewChange = useCallback((newView: View) => setView(newView), []);

  const handleCreateEventClick = () => {
    setSelectedSlot(null);
    setIsCreateLessonmodalOpen(true);
  };

  const eventStyleGetter = useCallback((event: LessonEvent) => {
    let backgroundColor = '#3174ad';
    switch (event.type) {
      case 'lesson': backgroundColor = '#3c8843'; break;
      case 'exam':   backgroundColor = '#d32f2f'; break;
      case 'meeting': backgroundColor = '#f57c00'; break;
    }
    return { style: { backgroundColor, borderRadius: '4px', opacity: 0.9, color: 'white', border: '0px', display: 'block' } };
  }, []);

  return (
    <>
      {!isMobile && (
        <Box sx={{ p: 3, pb: 0, mb: -2 }}>
          <PageHeader
            title="Lessons"
            actions={
              <Button variant="contained" onClick={handleCreateEventClick}>
                <AddIcon sx={{ mr: 1 }} />
                Add Event
              </Button>
            }
          />
        </Box>
      )}

      <Box
        onClick={handleCalendarClick}
        sx={{
          p: { xs: 0, sm: 3 },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 100px)' },
          '& .rbc-calendar': {
            '@media (max-width: 959px)': {
              padding: '0 !important',
              borderRadius: '0 !important',
              border: 'none !important',
            },
          },
        }}>
        <Calendar<LessonEvent>
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          slotPropGetter={(date: Date) => ({ 'data-slot-time': date.toISOString() } as any)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dayPropGetter={(date: Date) => { const d = new Date(date); d.setHours(9, 0, 0, 0); return { 'data-slot-time': d.toISOString() } as any; }}
          eventPropGetter={eventStyleGetter}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          views={{ month: true, week: true, day: true, agenda: true, threeDay: ThreeDayView } as any}
          step={30}
          showMultiDayTimes
          defaultDate={new Date()}
          formats={formats}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toolbar: CalendarToolbar as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            header: (view === 'week' || (view as string) === 'threeDay') ? WeekHeader as any : undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            month: { header: MonthHeader as any },
            event: ({ event }: { event: LessonEvent }) => (
              <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '6px 2px 2px' }}>{event.title}</span>
            ),
          }}
          style={{ height: '100%' }}
        />
      </Box>

      {isMobile && (
        <Fab color="primary" onClick={handleCreateEventClick} sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          <AddIcon />
        </Fab>
      )}

      <CreateEventModal
        isOpen={isCreateLessonModalOpen}
        onOpenChange={setIsCreateLessonmodalOpen}
        initialStartTime={selectedSlot?.start ?? null}
        initialEndTime={selectedSlot?.end ?? null}
      />

      <LessonEventDrawer
        event={selectedEvent}
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
      />
    </>
  );
}
