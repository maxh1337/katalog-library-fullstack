import { IRefetch } from '@/app/(customer)/explorer/filters/year-group/PriceGroup'
import { useFilters } from '@/app/(customer)/explorer/useFilters'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC<IRefetch> = ({ refetch }) => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { updateQueryParams } = useFilters()

	const { push } = useRouter()

	return (
		<>
			<div
				className='border-2 border-solid border-red grid w-2/4 rounded-xl overflow-hidden mb-5'
				style={{
					gridTemplateColumns: '3fr 0.1fr'
				}}
			>
				<input
					className=' bg-gray text-sm py-2 px-4 text-white outline-none'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Поиск статей...'
				/>
				<button
					onClick={() => {
						push(`/explorer?searchTerm=${searchTerm}`)
						updateQueryParams('searchTerm', searchTerm)
						refetch()
					}}
					className=' bg-red text-white flex items-center justify-center p-2.5'
				>
					<BsSearch className=' w-5 h-5' />
				</button>
			</div>
		</>
	)
}

export default Search
