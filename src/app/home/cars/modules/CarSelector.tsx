import { useCars } from '@/app/home/cars/car.hooks';
import { Car } from '@/app/home/cars/car.types';
import { DataSelector } from '@/components/elements/DataSelector';

interface CarSelectorProps {
  value: string | null;
  onChange: (carId: string | null) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CarSelector({
  value,
  onChange,
  error = false,
  helperText = '',
  label = 'Car',
  placeholder = 'Select a car...',
  disabled = false,
}: CarSelectorProps) {
  const { data = [], isLoading } = useCars();

  return (
    <DataSelector<Car>
      value={value}
      onChange={onChange}
      data={data}
      isLoading={isLoading}
      getOptionId={(car) => car.id}
      getOptionLabel={(car) => `${car.make} ${car.model}`}
      error={error}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}