import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Provider from '@/redux/provider';
import { Navbar } from '@/components/common';
import  Footer  from '@/components/homepage/footer/Footer';
import  Navbarreal from '@/components/homepage/navbar/Navbar';
import { Setup } from '@/components/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Full Auth',
	description: 'Full Auth application that provides jwt authentication',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>
					<Setup />
					<Navbar/>
					{/* <Navbarreal /> */}
			
					<div className=''>
						{children}
					</div>
					<Footer/>
				</Provider>
			</body>
		</html>
	);
}
