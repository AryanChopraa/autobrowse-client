
import Link from 'next/link';
import type { Metadata } from 'next';
import Hero from '@/components/homepage/hero/Hero';
import Hero2 from '@/components/homepage/test/test';
import Features from '@/components/homepage/features/Features';


export const metadata: Metadata = {
	title: 'Home',
	description: 'home page',
};

export default function Page() {
	return (
		<main className='bg-gradient-to-b from-gray-900 to-black scroll-smooth'>
			<Hero/>
			<Features/>
		</main>
	);
}
