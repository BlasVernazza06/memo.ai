import { redirect } from 'next/navigation';

import { LoginFormValues, RegisterFormValues } from '@repo/validators';

import { BACKEND_URL } from '@/lib/constants/constants';

export async function signUp(formData: RegisterFormValues) {
  const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData }),
  });

  if (response.ok) {
    redirect('/dashboard');
  }
}

export async function signIn(formData: LoginFormValues) {
  const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData }),
  });

  if (response.ok) {
    redirect('/dashboard');
  }
}
