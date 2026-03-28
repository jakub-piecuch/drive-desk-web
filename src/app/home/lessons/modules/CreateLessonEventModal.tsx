import { EntityFormModal } from "@/components/modals/EntityFormModal";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CarSelector } from "../../cars/modules/CarSelector";
import { InstructorSelector } from "../../instructors/modules/InstructorSelector";
import { TraineeSelector } from "../../trainees/modules/TraineeSelector";
import { useCreateLesson } from "../lesson.hooks";
import { CreateLesson } from "../lesson.types";
import { DateTimeSelector } from "@/components/elements/DateTimeSelector";
import Grid2 from "@mui/material/Grid";

interface CreateEventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialStartTime?: Date | null;
  initialEndTime?: Date | null;
}

export function CreateEventModal({
  isOpen: open,
  onOpenChange,
  initialStartTime = null,
  initialEndTime = null
}: CreateEventModalProps) {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [instructorId, setInstructorId] = useState<string | null>(null)
  const [traineeId, setTraineeId] = useState<string | null>(null)
  const [carId, setCarId] = useState<string | null>(null)
  const [errors, setErrors] = useState({
    startTime: false,
    endTime: false,
    instructorId: false,
    traineeId: false,
  });

  const { mutate: createLesson, isPending } = useCreateLesson();

  useEffect(() => {
    if (open) {
      setStartTime(initialStartTime ? initialStartTime.toISOString() : '');
      setEndTime(initialEndTime ? initialEndTime.toISOString() : '');
      setInstructorId(null);
      setTraineeId(null);
      setCarId(null);
      setErrors({
        startTime: false,
        endTime: false,
        instructorId: false,
        traineeId: false,
      });
    }
  }, [open, initialStartTime, initialEndTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      startTime: !startTime.trim(),
      endTime: !endTime.trim(),
      instructorId: !instructorId,
      traineeId: !traineeId
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!instructorId || !traineeId) {
      return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (endDate <= startDate) {
      toast.error('End time must be after start time.');
      setErrors(prev => ({ ...prev, startTime: true, endTime: true }));
      return;
    }

    const lessonData: CreateLesson = {
      startTime,
      endTime,
      instructorId,
      traineeId,
      carId
    }

    createLesson(
      lessonData,
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <EntityFormModal
      title="Add New Lesson"
      description="Enter details for the new lesson."
      isOpen={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isLoading={isPending}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <DateTimeSelector
            value={startTime}
            onChange={(value) => {
              setStartTime(value);
              if (errors.startTime) {
                setErrors(prev => ({ ...prev, startTime: false }));
              }
            }}
            label="Start Time"
            error={errors.startTime}
            helperText={errors.startTime ? 'Start time is required' : ''}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <DateTimeSelector
            value={endTime}
            onChange={(value) => {
              setEndTime(value);
              if (errors.endTime) {
                setErrors(prev => ({ ...prev, endTime: false }));
              }
            }}
            label="End Time"
            error={errors.endTime}
            helperText={errors.endTime ? 'End time is required' : ''}
            minDateTime={startTime ? new Date(startTime) : undefined}
          />
        </Grid2>
      </Grid2>

      <Stack spacing={2} sx={{ py: 2 }}>
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
          helperText={errors.traineeId ? "Trainee is required" : ''}
        />
        <CarSelector
          value={carId}
          onChange={setCarId}
        />
      </Stack>
    </EntityFormModal>
  );
}