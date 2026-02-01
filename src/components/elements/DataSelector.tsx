import { Autocomplete, CircularProgress, TextField } from '@mui/material';

interface DataSelectorProps<T> {
  value: string | null; // The selected ID
  onChange: (id: string | null) => void;
  data: T[]; // The array of entities
  isLoading: boolean;
  getOptionId: (option: T) => string; // Function to extract ID from entity
  getOptionLabel: (option: T) => string; // Function to display label
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function DataSelector<T>({
  value,
  onChange,
  data,
  isLoading,
  getOptionId,
  getOptionLabel,
  error = false,
  helperText = '',
  label = 'Select',
  placeholder = 'Select an option...',
  disabled = false,
}: DataSelectorProps<T>) {
  // Find the selected entity object from the ID
  const selectedOption = data.find((option) => getOptionId(option) === value) || null;

  return (
    <Autocomplete
      value={selectedOption}
      onChange={(_, newValue) => {
        // Send only the ID to the parent component
        onChange(newValue ? getOptionId(newValue) : null);
      }}
      options={data}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => getOptionId(option) === getOptionId(value)}
      loading={isLoading}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}