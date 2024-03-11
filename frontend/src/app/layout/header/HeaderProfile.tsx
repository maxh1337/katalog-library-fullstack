'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import { FC } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

const HeaderProfile: FC = () => {
	const { isShow, ref, setIsShow } = useOutside(false)
	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<div className='relative' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				<FaRegUser
					width={16}
					height={16}
					color='white'
					className='animate-opacity'
				/>
			</button>
			{isShow && (
				<div
					className='absolute w-40 right-2 z-20 rounded-md'
					style={{
						top: 'calc(100% + 1rem)'
					}}
				>
					{!!user && (
						<button
							className='bg-white shadow py-2 px-4 block w-full rounded-lg hover:text-primary duration-300 transition-colors'
							onClick={() => logout()}
						>
							<div className='flex'>
								<FiLogOut className=' mt-1' />
								<span className='ml-2'>Logout</span>
							</div>
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
