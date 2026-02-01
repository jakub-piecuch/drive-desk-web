import { useTrainees } from '@/app/home/trainees/trainee.hooks';
import { Trainee } from '@/app/home/trainees/trainee.types';
import { DataSelector } from '@/components/elements/DataSelector';

interface TraineeSelectorProps {
  value: string | null;
  onChange: (traineeId: string | null) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TraineeSelector({
  value,
  onChange,
  error = false,
  helperText = '',
  label = 'Trainee',
  placeholder = 'Select a trainee...',
  disabled = false,
}: TraineeSelectorProps) {
  const { data = [], isLoading } = useTrainees();

  return (
    <DataSelector<Trainee>
      value={value}
      onChange={onChange}
      data={data}
      isLoading={isLoading}
      getOptionId={(trainee) => trainee.id}
      getOptionLabel={(trainee) => `${trainee.name} ${trainee.surname}`}
      error={error}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}