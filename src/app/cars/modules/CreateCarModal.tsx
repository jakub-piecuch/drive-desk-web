import { EntityFormModal } from "@/components/CreateFormModal";
import { FormInputRow } from "@/components/FormInputRow";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useCreateCar } from "../car.hooks";

interface CreateCarModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCarModal({ isOpen: open, onOpenChange }: CreateCarModalProps) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const { mutate: createCar, isPending } = useCreateCar();

  useEffect(() => {
    if (open) {
      setMake('');
      setModel('');
      setRegistrationNumber('');
    }
  }, [open]);


  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!make || !model || !registrationNumber) {
      toast.error('Please fill in all required fields.');
      return;
    }

    createCar(
      {
        make: make,
        model: model,
        registrationNumber: registrationNumber
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        }
      }
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
      <div className="grid grid-cols-4 items-start gap-4">
        <FormInputRow
          id="make"
          labelText="Make"
          placeholder="make..."
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <FormInputRow
          id="model"
          labelText="Model"
          placeholder="model..."
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <FormInputRow
          id="registrationNumber"
          labelText="Registration Number"
          placeholder="registration number..."
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
      </div>
    </EntityFormModal>
  );
}