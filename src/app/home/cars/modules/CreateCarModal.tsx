import { EntityFormModal } from "@/components/modals/EntityFormModal";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useCreateCar } from "../car.hooks";
import { FormInputRow } from "@/components/elements/FormInputRow";
import { Stack } from "@mui/material";

interface CreateCarModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCarModal({ isOpen: open, onOpenChange }: CreateCarModalProps) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [errors, setErrors] = useState({ make: false, model: false, registrationNumber: false });

  const { mutate: createCar, isPending } = useCreateCar();

  useEffect(() => {
    if (open) {
      setMake('');
      setModel('');
      setRegistrationNumber('');
      setErrors({ make: false, model: false, registrationNumber: false });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      make: !make.trim(),
      model: !model.trim(),
      registrationNumber: !registrationNumber.trim()
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    createCar(
      { make: make.trim(), model: model.trim(), registrationNumber: registrationNumber.trim() },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <EntityFormModal
      title="Create New Car"
      description="Enter the details for the new car."
      isOpen={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isLoading={isPending}
    >
      <Stack spacing={2} sx={{ py: 2 }}>
        <FormInputRow
          id="make"
          labelText="Make"
          placeholder="Enter make..."
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
            if (errors.make) setErrors(prev => ({ ...prev, make: false }));
          }}
          error={errors.make}
          helperText={errors.make ? 'Make is required' : ''}
        />
        <FormInputRow
          id="model"
          labelText="Model"
          placeholder="Enter model..."
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            if (errors.model) setErrors(prev => ({ ...prev, model: false }));
          }}
          error={errors.model}
          helperText={errors.model ? 'Model is required' : ''}
        />
        <FormInputRow
          id="registrationNumber"
          labelText="Registration Number"
          placeholder="Enter registration number..."
          value={registrationNumber}
          onChange={(e) => {
            setRegistrationNumber(e.target.value);
            if (errors.registrationNumber) setErrors(prev => ({ ...prev, registrationNumber: false }));
          }}
          error={errors.registrationNumber}
          helperText={errors.registrationNumber ? 'Registration number is required' : ''}
        />
      </Stack>
    </EntityFormModal>
  );
}