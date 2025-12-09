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
import { getTheme } from "@/lib/theme-config";
import { useState } from 'react';
import { toast } from "sonner";
import { useCreateCar } from "../car.hooks";

interface CreateCarModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCarModal({ isOpen: open, onOpenChange }: CreateCarModalProps) {
  const theme = getTheme();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const { mutate: createCar, isPending } = useCreateCar();

  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    if (!newOpenState) {
      // If the new state is 'false' (closing the modal), reset the form
      resetForm();
    }
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
        registrationNumber: registrationNumber,
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
        }
      }
    );
  };

  const resetForm = () => {
    setMake('');
    setModel('');
    setRegistrationNumber('');
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Car</DialogTitle>
          <DialogDescription>
            Add a new Car for you school.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}>
              {isPending ? 'Creating...' : 'Create Car'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}