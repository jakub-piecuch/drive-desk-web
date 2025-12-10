import { EntityFormModal } from "@/components/CreateFormModal";
import { FormInputRow } from "@/components/FormInputRow";
import { useEffect, useState } from 'react';
import { useUpdateCarById } from "../car.hooks";

interface UpdateCarModalProps {
  id: string;
  make: string;
  model: string;
  registrationNumber: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateCarModal({
  id: id,
  make: currentMake,
  model: currentModel,
  registrationNumber: currentRegistrationNumber,
  isOpen: open,
  onOpenChange
}: UpdateCarModalProps) {
  const [make, setMake] = useState(currentMake);
  const [model, setModel] = useState(currentModel);
  const [registrationNumber, setRegistrationNumber] = useState(currentRegistrationNumber);
  const { mutate: UpdateCar, isPending } = useUpdateCarById();

  useEffect(() => {
    if (open) {
      setMake(currentMake);
      setModel(currentModel);
      setRegistrationNumber(currentRegistrationNumber);
    }
  }, [open]);

  const handleOpenChange = (newOpenState: boolean) => {
    if (open && !id) {
      console.error('No car ID provided');
      return;
    }

    onOpenChange(newOpenState);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    UpdateCar(
      {
        id: id,
        make: make,
        model: model,
        registrationNumber: registrationNumber,
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
          title="Update Car"
          description="Update your car informations."
          isOpen={open}
          onOpenChange={onOpenChange}
          onSubmit={handleSubmit}
          isLoading={isPending}
        >
          <div className="grid grid-cols-4 items-start gap-4">
              <FormInputRow
                id="make"
                labelText="Make"
                placeholder={make}
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <FormInputRow
                id="model"
                labelText="Model"
                placeholder={model}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <FormInputRow
                id="registrationNumber"
                labelText="Registration Number"
                placeholder={model}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
        </EntityFormModal>
  );
}