import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Provider from '@/redux/provider';
import { Navbar } from '@/components/common';
import Footer from '@/components/homepage/footer/Footer';
import Navbarr from '@/components/homepage/navbar/Navbar';
import { Setup } from '@/components/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'autosurf.ai',
	description: 'AI powered browser autosurf tool',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='bg-black'>
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<Provider>
					<Setup />
					{/* <Navbar/> */}
					<Navbarr />
					<main className="flex-grow bg-black">
						{children}
					</main>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}