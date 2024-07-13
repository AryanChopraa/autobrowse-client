import cn from 'classnames';

interface Props {
	provider: 'google' | 'facebook';
	children: React.ReactNode;
	[rest: string]: any;
}

export default function SocialButton({ provider, children, ...rest }: Props) {
	const className = cn(
		'flex-1 text-white rounded-md px-4 mt-3 font-medium py-3 items-center justify-center flex',
		{
			'bg-blue-500 hover:bg-blue-600': provider === 'google',
		}
	);

	return (
		<button className={className} {...rest}>
			<span className='flex justify-start items-center'>{children}</span>
		</button>
	);
}
