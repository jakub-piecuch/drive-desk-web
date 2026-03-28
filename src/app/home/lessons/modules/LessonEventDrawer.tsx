'use client';

import { ConfirmDialog } from '@/components/elements/ConfirmDialog';
import { DateTimeSelector } from '@/components/elements/DateTimeSelector';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CarSelector } from '../../cars/modules/CarSelector';
import { InstructorSelector } from '../../instructors/modules/InstructorSelector';
import { TraineeSelector } from '../../trainees/modules/TraineeSelector';
import { useDeleteLessonById, useUpdateLessonById } from '../lesson.hooks';
import { LessonEvent } from '../lesson.types';

interface LessonEventDrawerProps {
  event: LessonEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

type DrawerMode = 'view' | 'edit';

export function LessonEventDrawer({ event, isOpen, onClose }: LessonEventDrawerProps) {
  const [mode, setMode] = useState<DrawerMode>('view');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [instructorId, setInstructorId] = useState<string | null>(null);
  const [traineeId, setTraineeId] = useState<string | null>(null);
  const [carId, setCarId] = useState<string | null>(null);
  const [errors, setErrors] = useState({ startTime: false, endTime: false, instructorId: false, traineeId: false });

  const { mutate: updateLesson, isPending: isUpdating } = useUpdateLessonById();
  const { mutate: deleteLesson, isPending: isDeleting } = useDeleteLessonById();

  useEffect(() => {
    if (isOpen && event) {
      setMode('view');
      setStartTime(event.start.toISOString());
      setEndTime(event.end.toISOString());
      setInstructorId(event.instructorId ?? null);
      setTraineeId(event.traineeId ?? null);
      setCarId(event.carId ?? null);
      setErrors({ startTime: false, endTime: false, instructorId: false, traineeId: false });
    }
  }, [isOpen, event]);

  const handleClose = () => {
    if (!isUpdating && !isDeleting) onClose();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const newErrors = {
      startTime: !startTime,
      endTime: !endTime,
      instructorId: !instructorId,
      traineeId: !traineeId,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      toast.error('End time must be after start time.');
      setErrors(prev => ({ ...prev, startTime: true, endTime: true }));
      return;
    }

    updateLesson(
      { id: event.id, startTime, endTime, instructorId: instructorId!, traineeId: traineeId!, carId },
      { onSuccess: () => { setMode('view'); onClose(); } }
    );
  };

  const handleConfirmDelete = () => {
    if (!event) return;
    deleteLesson(event.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        onClose();
      },
    });
  };

  if (!event) return null;

  const dragHandle = (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 0.5, flexShrink: 0 }}>
      <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: 'divider' }} />
    </Box>
  );

  const viewContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {dragHandle}

      <Stack sx={{ px: 3, pt: 2, pb: 1, flexShrink: 0 }}>
        <Typography variant="h6" fontWeight={600}>{event.title}</Typography>
      </Stack>

      <Divider />

      <Stack spacing={2} sx={{ px: 3, py: 3, flex: 1, overflowY: 'auto' }}>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">Start</Typography>
          <Typography variant="body1">{format(event.start, 'dd MMM yyyy, HH:mm')}</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">End</Typography>
          <Typography variant="body1">{format(event.end, 'dd MMM yyyy, HH:mm')}</Typography>
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={1} sx={{ px: 3, pt: 2, pb: 3, flexShrink: 0 }}>
        <Button variant="contained" fullWidth onClick={() => setMode('edit')}>
          Edit
        </Button>
        <Button variant="outlined" color="error" fullWidth onClick={() => setIsDeleteDialogOpen(true)}>
          Delete
        </Button>
      </Stack>
    </Box>
  );

  const editContent = (
    <Box component="form" onSubmit={handleEditSubmit} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {dragHandle}

      <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, pt: 1, pb: 1, flexShrink: 0 }}>
        <IconButton size="small" onClick={() => setMode('view')} disabled={isUpdating}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" fontWeight={600}>Edit Lesson</Typography>
      </Stack>

      <Divider />

      <Stack spacing={2} sx={{ px: 3, py: 3, flex: 1, overflowY: 'auto' }}>
        <DateTimeSelector
          value={startTime}
          onChange={(v) => { setStartTime(v); if (errors.startTime) setErrors(p => ({ ...p, startTime: false })); }}
          label="Start Time"
          error={errors.startTime}
          helperText={errors.startTime ? 'Start time is required' : ''}
        />
        <DateTimeSelector
          value={endTime}
          onChange={(v) => { setEndTime(v); if (errors.endTime) setErrors(p => ({ ...p, endTime: false })); }}
          label="End Time"
          error={errors.endTime}
          helperText={errors.endTime ? 'End time is required' : ''}
          minDateTime={startTime ? new Date(startTime) : undefined}
        />
        <InstructorSelector
          value={instructorId}
          onChange={setInstructorId}
          error={errors.instructorId}
          helperText={errors.instructorId ? 'Instructor is required' : ''}
        />
        <TraineeSelector
          value={traineeId}
          onChange={setTraineeId}
          error={errors.traineeId}
          helperText={errors.traineeId ? 'Trainee is required' : ''}
        />
        <CarSelector value={carId} onChange={setCarId} />
      </Stack>

      <Divider />

      <Stack spacing={1} sx={{ px: 3, pt: 2, pb: 3, flexShrink: 0 }}>
        <Button type="submit" variant="contained" fullWidth disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="outlined" fullWidth onClick={() => setMode('view')} disabled={isUpdating}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={handleClose}
        onOpen={() => {}}
        disableSwipeToOpen
        sx={{
          '& .MuiDrawer-paper': {
            height: '90vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          },
        }}
      >
        {mode === 'view' ? viewContent : editContent}
      </SwipeableDrawer>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lesson"
        description="Are you sure you want to delete this lesson? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        severity="error"
      />
    </>
  );
}
