'use client';

import { useState } from 'react';

import { GitHubLight, Google } from '@ridemountainpig/svgl-react';
import { Loader2 } from 'lucide-react';

import { signIn } from '@repo/auth/client';
import { Button } from '@repo/ui/components/ui/button';

interface OAuthButtonsProps {
  disabled?: boolean;
  callbackUrl?: string;
}

export default function OAuthButtons({
  disabled,
  callbackUrl,
}: OAuthButtonsProps) {
  const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null);

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider);
      const webUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const redirectTo = callbackUrl ? `${webUrl}${callbackUrl}` : webUrl;
      
      // We use a custom fetch to the social endpoint because the NestJS adapter currently
      // has a bug where it truncates the JSON response body, but the 'Location' header
      // contains the correct and complete Google/GitHub OAuth URL.
      const response = await fetch(`${apiUrl}/api/auth/sign-in/social`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ provider, callbackURL: redirectTo }),
      });

      const locationHeader = response.headers.get('Location') || response.headers.get('location');
      
      if (locationHeader) {
        window.location.href = locationHeader;
        return;
      }
      
      // Fallback if Location header is missing
      const res = await signIn.social({ provider, callbackURL: redirectTo });
      if (res?.error) {
        console.error('OAuth error:', res.error);
        alert(`Error: ${res.error.message || 'Unknown OAuth error'}`);
      }
    } catch (error) {
      console.error('OAuth throw error:', error);
      alert(
        `Exception: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full font-sans">
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        className="bg-white border-[#E2E8F0] hover:bg-[#FAFBFC] h-12 rounded-xl transition-all hover:border-primary/20 flex items-center justify-center gap-2 shadow-sm"
        onClick={() => handleSignIn('google')}
      >
        {isLoading === 'google' ? (
          <Loader2 className="size-5 animate-spin text-gray-500" />
        ) : (
          <Google className="size-5" />
        )}
        <span className="text-xs font-semibold text-[#1A1C1E]">Google</span>
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        className="bg-white border-[#E2E8F0] hover:bg-[#FAFBFC] h-12 rounded-xl transition-all hover:border-primary/20 flex items-center justify-center gap-2 shadow-sm"
        onClick={() => handleSignIn('github')}
      >
        {isLoading === 'github' ? (
          <Loader2 className="size-5 animate-spin text-gray-500" />
        ) : (
          <GitHubLight className="size-5" />
        )}
        <span className="text-xs font-semibold text-[#1A1C1E]">GitHub</span>
      </Button>
    </div>
  );
}
