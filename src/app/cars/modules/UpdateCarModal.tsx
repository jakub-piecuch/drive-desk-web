import { FormInputRow } from "@/components/FormInputRow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Update Car</DialogTitle>
          <DialogDescription>
            Update your car informations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <FormInputRow
                id="make"
                labelText="Make"
                placeholder={make}
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
              <FormInputRow
                id="model"
                labelText="Model"
                placeholder={model}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
              <FormInputRow
                id="registrationNumber"
                labelText="Registration Number"
                placeholder={model}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Update Car'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}