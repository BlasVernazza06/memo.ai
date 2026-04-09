import { redirect } from 'next/navigation';

import { LoginFormValues, RegisterFormValues } from '@repo/validators';

import { API_URL } from '@/lib/constants/constants';

export async function signUp(formData: RegisterFormValues) {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
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
  const response = await fetch(`${API_URL}/auth/sign-in`, {
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

export async function signInSocial(
  provider: 'google' | 'github',
  callbackUrl?: string,
) {
  const webUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
  const redirectTo = callbackUrl ? `${webUrl}${callbackUrl}` : webUrl;

  const url = `${API_URL}/auth/login/social/${provider}?callbackURL=${encodeURIComponent(redirectTo)}`;

  redirect(url);
}
