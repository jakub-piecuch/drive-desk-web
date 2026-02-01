import { EntityFormModal } from "@/components/modals/EntityFormModal";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { useUpdateTraineeById } from "../trainee.hooks";
import { FormInputRow } from "@/components/elements/FormInputRow";
import { Stack } from "@mui/material";

interface UpdateTraineeModalProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateTraineeModal({
  id,
  name: currentName,
  surname: currentSurname,
  email: currentEmail,
  phoneNumber: currentPhoneNumber,
  isOpen: open,
  onOpenChange
}: UpdateTraineeModalProps) {
  const [name, setName] = useState(currentName);
  const [surname, setSurname] = useState(currentSurname);
  const [email, setEmail] = useState(currentEmail);
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const [errors, setErrors] = useState({ name: false, surname: false, email: false, phoneNumber:false });

  const { mutate: updateTrainee, isPending } = useUpdateTraineeById();

  useEffect(() => {
    if (open) {
      setName(currentName);
      setSurname(currentSurname);
      setEmail(currentEmail);
      setPhoneNumber(currentPhoneNumber)
      setErrors({ name: false, surname: false, email: false, phoneNumber: false });
    }
  }, [open, currentName, currentSurname, currentEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors = {
      name: !name.trim(),
      surname: !surname.trim(),
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim()
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    updateTrainee(
      {
        id,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim()
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
      title="Update Trainee"
      description="Update your trainee information."
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
          labelText="Registration Number"
          placeholder="Enter registration number..."
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: false }));
          }}
          error={errors.phoneNumber}
          helperText={errors.phoneNumber ? 'Phone number is required' : ''}
        />
      </Stack>
    </EntityFormModal>
  );
}