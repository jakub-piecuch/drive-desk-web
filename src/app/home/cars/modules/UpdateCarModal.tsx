import { EntityFormModal } from "@/components/modules/modals/EntityFormModal";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useUpdateCarById } from "../car.hooks";
import { FormInputRow } from "@/components/modules/elements/FormInputRow";
import { Stack } from "@mui/material";

interface UpdateCarModalProps {
  id: string;
  make: string;
  model: string;
  registrationNumber: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateCarModal({
  id,
  make: currentMake,
  model: currentModel,
  registrationNumber: currentRegistrationNumber,
  isOpen: open,
  onOpenChange
}: UpdateCarModalProps) {
  const [make, setMake] = useState(currentMake);
  const [model, setModel] = useState(currentModel);
  const [registrationNumber, setRegistrationNumber] = useState(currentRegistrationNumber);
  const [errors, setErrors] = useState({ make: false, model: false, registrationNumber: false });

  const { mutate: updateCar, isPending } = useUpdateCarById();

  useEffect(() => {
    if (open) {
      setMake(currentMake);
      setModel(currentModel);
      setRegistrationNumber(currentRegistrationNumber);
      setErrors({ make: false, model: false, registrationNumber: false });
    }
  }, [open, currentMake, currentModel, currentRegistrationNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors = {
      make: !make.trim(),
      model: !model.trim(),
      registrationNumber: !registrationNumber.trim()
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    updateCar(
      {
        id,
        make: make.trim(),
        model: model.trim(),
        registrationNumber: registrationNumber.trim(),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <EntityFormModal
      title="Update Car"
      description="Update your car information."
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