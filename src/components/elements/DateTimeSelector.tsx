import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  // V3 works for v4+
import { format } from 'date-fns';
import { useState } from 'react';

type DateTimeView = 'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds';
const DATE_VIEWS: DateTimeView[] = ['year', 'month', 'day'];

interface DateTimeSelectorProps {
  value: string;
  onChange: (isoString: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  minDateTime?: Date;
  maxDateTime?: Date;
}

/**
 * DateTimeSelector - A reusable date/time picker that outputs ISO format strings
 * 
 * @param value - ISO string in format "2025-01-13T12:12:12"
 * @param onChange - Callback that receives ISO string in format "2025-01-13T12:12:12"
 * 
 * @example
 * const [startTime, setStartTime] = useState('');
 * 
 * <DateTimeSelector
 *   value={startTime}
 *   onChange={setStartTime}
 *   label="Start Time"
 * />
 * 
 * // When submitted:
 * // startTime = "2025-01-13T12:12:12"
 */
export function DateTimeSelector({
  value,
  onChange,
  label,
  error = false,
  helperText = '',
  disabled = false,
  minDateTime,
  maxDateTime,
}: DateTimeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DateTimeView>('day');

  const dateValue = value ? new Date(value) : null;

  const handleChange = (newValue: Date | null) => {
    if (newValue && !isNaN(newValue.getTime())) {
      if (DATE_VIEWS.includes(view)) {
        const withMidnight = new Date(newValue);
        withMidnight.setHours(0, 0, 0, 0);
        onChange(format(withMidnight, "yyyy-MM-dd'T'HH:mm:ss"));
        setView('hours');
      } else {
        onChange(format(newValue, "yyyy-MM-dd'T'HH:mm:ss"));
      }
    } else {
      onChange('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={dateValue}
        onChange={handleChange}
        disabled={disabled}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => { setOpen(false); setView('day'); }}
        view={view}
        onViewChange={(newView) => setView(newView as DateTimeView)}
        slotProps={{
          textField: {
            fullWidth: true,
            error: error,
            helperText: helperText,
            onClick: () => !disabled && setOpen(true),
            sx: {
              '& .MuiInputBase-root': {
                cursor: 'pointer',
              },
              '& .MuiInputBase-input': {
                cursor: 'pointer',
              },
            },
          },
        }}
        ampm={false}
      />
    </LocalizationProvider>
  );
}