'use client';

import React, { Suspense } from 'react';
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import { useSocialAuth } from '@/hooks';
import { Spinner } from '@/components/common';

const SocialAuthContent: React.FC<{ provider: string }> = ({ provider }) => {
  const [googleAuthenticate] = useSocialAuthenticateMutation();

  
  useSocialAuth(googleAuthenticate, provider);

  return null;
};

export default function Page() {
  return (
	<div className='my-8'>
	  <Suspense fallback={<Spinner lg />}>
		<SocialAuthContent provider="google-oauth2" />
	  </Suspense>
	</div>
  );
}