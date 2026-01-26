import { useInstructors } from '@/app/home/instructors/instructor.hooks';
import { Instructor } from '@/app/home/instructors/instructor.types';
import { DataSelector } from '@/components/elements/DataSelector';

interface InstructorSelectorProps {
  value: string | null;
  onChange: (instructorId: string | null) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function InstructorSelector({
  value,
  onChange,
  error = false,
  helperText = '',
  label = 'Instructor',
  placeholder = 'Select an instructor...',
  disabled = false,
}: InstructorSelectorProps) {
  const { data = [], isLoading } = useInstructors();

  return (
    <DataSelector<Instructor>
      value={value}
      onChange={onChange}
      data={data}
      isLoading={isLoading}
      getOptionId={(instructor) => instructor.id}
      getOptionLabel={(instructor) => `${instructor.name} ${instructor.surname}`}
      error={error}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}