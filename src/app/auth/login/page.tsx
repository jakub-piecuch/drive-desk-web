'use client';

import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const otpSchema = z.object({
  code: z.string().length(6, 'Enter the 6-digit code'),
});

type LoginValues = z.infer<typeof loginSchema>;
type OtpValues = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [loginKey, setLoginKey] = useState(0);

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const otpForm = useForm<OtpValues>({ resolver: zodResolver(otpSchema) });

  const onSubmitCredentials = async (data: LoginValues) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/home/dashboard');
      } else if (result.status === 'needs_second_factor') {
        await signIn.prepareSecondFactor({ strategy: 'email_code' });
        setStep('otp');
        toast.success('Verification code sent to your email');
      }
    } catch (err: unknown) {
      const error = (err as { errors?: { code: string; message: string }[] })?.errors?.[0];
      const credentialErrors = ['form_password_incorrect', 'form_identifier_not_found'];
      const message = error && credentialErrors.includes(error.code)
        ? 'Invalid email or password'
        : error?.message ?? 'Something went wrong. Please try again.';
      toast.error(message);
    }
  };

  const onSubmitOtp = async (data: OtpValues) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code: data.code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/home/dashboard');
      }
    } catch (err: unknown) {
      const message =
        (err as { errors?: { message: string }[] })?.errors?.[0]?.message ??
        'Invalid or expired code';
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
      {step === 'credentials' ? (
        <Box
          key={loginKey}
          component="form"
          onSubmit={loginForm.handleSubmit(onSubmitCredentials)}
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
              Sign in
            </Typography>

            <TextField
              {...loginForm.register('email')}
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              error={!!loginForm.formState.errors.email}
              helperText={loginForm.formState.errors.email?.message}
            />

            <TextField
              {...loginForm.register('password')}
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              error={!!loginForm.formState.errors.password}
              helperText={loginForm.formState.errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loginForm.formState.isSubmitting || !isLoaded}
              sx={{ py: 1.5 }}
            >
              {loginForm.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" style={{ color: '#3c8843' }}>
                Register
              </Link>
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={otpForm.handleSubmit(onSubmitOtp)}
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
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={700}>
                Check your email
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We sent a 6-digit verification code to your email address.
              </Typography>
            </Stack>

            <TextField
              {...otpForm.register('code')}
              label="Verification code"
              autoComplete="one-time-code"
              fullWidth
              slotProps={{ htmlInput: { maxLength: 6 } }}
              error={!!otpForm.formState.errors.code}
              helperText={otpForm.formState.errors.code?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={otpForm.formState.isSubmitting || !isLoaded}
              sx={{ py: 1.5 }}
            >
              {otpForm.formState.isSubmitting ? 'Verifying…' : 'Verify'}
            </Button>

            <Button
              type="button"
              variant="text"
              fullWidth
              onPointerDown={(e) => {
                e.preventDefault();
                otpForm.reset();
                setLoginKey((k) => k + 1);
                setStep('credentials');
              }}
              sx={{ color: 'text.secondary' }}
            >
              Back to sign in
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
