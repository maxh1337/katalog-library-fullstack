import { SITE_NAME } from '@/constants/seo.constants'
import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import { Golos_Text, Inter } from 'next/font/google'
import '../assets/styles/globals.scss'
import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })
export const getSiteUrl = () => process.env.APP_URL as string

export const metadata: Metadata = {
	icons: {
		icon: '/images/favicon.svg'
	},
	title: {
		absolute: 'Library',
		template: `%s | Library`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['info@library.com']
	}
}

const golos = Golos_Text({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
	style: ['normal'],
	variable: '--font-golos'
})

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className={golos.variable}>
			<body className={inter.className}>
				<Providers>
					<div className='bg-gray1'>
						<Header />
						<div
							className='grid'
							style={{
								gridTemplateColumns: '.6fr 4fr'
							}}
						>
							<Sidebar />
							<main className='p-12 pb-52 rounded-tl-lg bg-gray'>
								{children}
							</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}
