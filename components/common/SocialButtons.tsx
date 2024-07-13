'use client';

import { ImGoogle, ImFacebook } from 'react-icons/im';
import { SocialButton } from '@/components/common';
import { continueWithGoogle, continueWithFacebook } from '@/utils';

export default function SocialButtons() {
	return (
		<div className='flex w-auto items-center gap-2 mt-5'>
			<SocialButton provider='google' onClick={continueWithGoogle}>
				<ImGoogle className='mr-3' /> Google Signin
			</SocialButton>
			
		</div>
	);
}
