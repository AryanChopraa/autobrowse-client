'use client';

import React from 'react';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { List, Spinner } from '@/components/common';

export default function Page() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

	const config = [
		{
			label: 'First Name',
			value: user?.first_name,
		},
		{
			label: 'Last Name',
			value: user?.last_name,
		},
		{
			label: 'Email',
			value: user?.email,
		},
	];

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center items-center min-h-screen bg-gray-950 text-white'>
				<Spinner lg />
			</div>
		);
	}

	return (
		<div className="bg-gray-950 min-h-screen text-white pt-24"> {/* Added pt-24 for top padding */}
			<div className="overflow-hidden backdrop-blur-md sm:py-16 transition-all duration-300 ease-in-out">
				<div className='flex items-center justify-center px-4 sm:px-6 lg:px-8 mb-12'>
					<h1 className='text-3xl md:text-5xl lg:text-7xl font-bold text-center transition-all duration-300 ease-in-out'>
						Your Account
					</h1>
				</div>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 lg:p-10 transition-all duration-300 ease-in-out">
						<List config={config} />
					</div>
				</div>
			</div>
		</div>
	);
}