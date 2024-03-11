'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import HeaderProfile from './HeaderProfile'

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<header
			className=' bg-gray1 w-full py-6 px-6 grid'
			style={{
				gridTemplateColumns: '1fr 1.2fr'
			}}
		>
			<Link href='/'>
				<Image
					priority
					width={43}
					height={43}
					src='/images/logo3.svg'
					alt='Library'
				/>
			</Link>
			<div className='flex items-center justify-end gap-3 mr-8'>
				<p className=' text-white pb-1.5'>{user?.email}</p>
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
