import { EntityFormModal } from "@/components/modals/EntityFormModal";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useCreateTrainee } from "../trainee.hooks";
import { FormInputRow } from "@/components/elements/FormInputRow";
import { Stack } from "@mui/material";

interface CreateTraineeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTraineeModal({ isOpen: open, onOpenChange }: CreateTraineeModalProps) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({ name: false, surname: false, email: false, phoneNumber: false });

  const { mutate: createTrainee, isPending } = useCreateTrainee();

  useEffect(() => {
    if (open) {
      setName('');
      setSurname('');
      setEmail('');
      setErrors({ name: false, surname: false, email: false, phoneNumber: false });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      surname: !surname.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim()
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    createTrainee(
      { name: name.trim(), surname: surname.trim(), email: email.trim(), phoneNumber: phoneNumber.trim() },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <EntityFormModal
      title="Create New Trainee"
      description="Enter the details for the new trainee."
      isOpen={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isLoading={isPending}
    >
      <Stack spacing={2} sx={{ py: 2 }}>
        <FormInputRow
          id="name"
          labelText="Name"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors(prev => ({ ...prev, name: false }));
          }}
          error={errors.name}
          helperText={errors.name ? 'Name is required' : ''}
        />
        <FormInputRow
          id="surname"
          labelText="Surname"
          placeholder="Enter surname..."
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
            if (errors.surname) setErrors(prev => ({ ...prev, surname: false }));
          }}
          error={errors.surname}
          helperText={errors.surname ? 'Surname is required' : ''}
        />
        <FormInputRow
          id="email"
          labelText="Email Number"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: false }));
          }}
          error={errors.email}
          helperText={errors.email ? 'Registration number is required' : ''}
        />
         <FormInputRow
          id="phoneNumber"
          labelText="Phone Number"
          placeholder="Enter phone number..."
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: false }));
          }}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber ? 'Phone number is required' : ''}
        />
      </Stack>
    </EntityFormModal>
  );
}