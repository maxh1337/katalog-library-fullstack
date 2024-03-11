'use client'

import cn from 'clsx'
import { FC } from 'react'

import { useCategories } from '@/hooks/modelHooks/useCategories'
import { useAuth } from '@/hooks/useAuth'
import Loader from '@/ui/Loader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { convertToMenuItems } from './convert-to-menu-items'

const Sidebar: FC = () => {
	const { data, isLoading } = useCategories()
	const pathname = usePathname()

	const { user } = useAuth()
	console.log(user)

	return (
		<aside
			className=' bg-gray1 flex flex-col z-10 justify-between'
			style={{
				minHeight: 'calc(100% - 91px)',
				height: 'calc(100vh - 91px)'
			}}
		>
			<div>
				{isLoading ? (
					<Loader />
				) : data ? (
					<>
						<div className='text-xl text-white mt-4 mb-6 ml-6'>
							Categories: 👇
						</div>
						<ul>
							{convertToMenuItems(data).map(item => (
								<li key={item.href}>
									<Link
										className={cn(
											'block text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
											pathname === item.href ? 'text-red' : 'text-white'
										)}
										href={item.href}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</>
				) : (
					<div> Categories not found! </div>
				)}
			</div>

			{user?.isAdmin && (
				<Link
					href='/admin'
					className=' pb-1.5 text-white  text-lg hover:text-primary transition-colors duration-200 mx-auto mb-5'
				>
					Админ панель
				</Link>
			)}
		</aside>
	)
}

export default Sidebar
