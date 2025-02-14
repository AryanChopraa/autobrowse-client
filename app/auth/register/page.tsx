import Link from 'next/link';
import { RegisterForm } from '@/components/forms';
import { SocialButtons } from '@/components/common';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register',
	description: 'Register page',
};

export default function Page() {
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				
				<h2 className='mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-white'>
					Sign up for your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<RegisterForm />
				<SocialButtons />

				<p className='mt-10 text-center text-sm text-gray-500'>
					Already have an account?{' '}
					<Link
						href='/auth/login'
						className='font-semibold leading-6 text-blue-500 hover:text-blue-600'
					>
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}
