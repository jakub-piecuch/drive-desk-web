import { TextField } from '@mui/material';

interface FormInputRowProps {
  id: string;
  labelText: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  error?: boolean;
  helperText?: string;
}

export function FormInputRow({
  id,
  labelText,
  placeholder,
  value,
  onChange,
  type = 'text',
  className,
  error = false,
  helperText,
  ...props
}: FormInputRowProps) {
  return (
    <TextField
      id={id}
      label={labelText}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      className={className}
      fullWidth
      variant="outlined"
      error={error}
      helperText={helperText}
      {...props}
    />
  );
}