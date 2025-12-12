import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputRowProps {
  id: string,
  labelText: string,
  placeholder: string,
  value: string,
  onChange: (any: any) => void,
  required?: boolean,
  type?: string,
  className?: string
}

export function FormInputRow({
  id,
  labelText,
  placeholder,
  value,
  onChange,
  required = false,
  type = 'text',
  className,
  ...props
}: FormInputRowProps) {
  return (
    <>
      <Label htmlFor={id} className="text-right pt-3">
        {labelText+':'}
      </Label>
      <div className="col-span-3">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
          className={className}
          {...props}
        />
      </div>
    </>
  );
}