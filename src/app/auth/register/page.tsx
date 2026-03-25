'use client';

import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/home/dashboard');
      }
    } catch (err: unknown) {
      const message =
        (err as { errors?: { message: string }[] })?.errors?.[0]?.message ??
        'Registration failed. Please try again.';
      toast.error(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700}>
            Create account
          </Typography>

          <TextField
            {...register('email')}
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register('password')}
            label="Password"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            {...register('confirmPassword')}
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting || !isLoaded}
            sx={{ py: 1.5 }}
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#3c8843' }}>
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
