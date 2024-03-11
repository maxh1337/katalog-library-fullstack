import { FC, useState } from 'react'

import { DeleteAuthor, UpdateAuthor } from '@/hooks/modelHooks/useAuthors'
import { useDebounce } from '@/hooks/useDebounce'
import { IAuthor } from '@/services/author/author.types'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface IJournalElementProps {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IAuthor[], Error>>
	author: IAuthor
}

const AuthorElement: FC<IJournalElementProps> = ({ author, refetch }) => {
	const [target, setTarget] = useState<number>(0)
	const [updatedName, setUpdatedName] = useState<string>('')

	const { mutate: deleteAuthor } = DeleteAuthor(target, refetch)

	const { mutate: updateAuthor } = useDebounce(
		UpdateAuthor(author.id, updatedName, refetch),
		1000
	)

	const handleUpdate = (name: string) => {
		setUpdatedName(name)

		updateAuthor()
	}

	return (
		<div className='animate-scaleIn flex-col'>
			<input
				defaultValue={author?.name}
				onChange={e => {
					handleUpdate(e?.target?.value)
				}}
				className=' bg-gray text-white mt-2 font-semibold text-white text-xl pb-2 ml-1'
			/>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>id:</dt>
				<dt className=' ml-2 text-white'>{author?.id ? author?.id : ' — '}</dt>
			</div>
			{author.articles.length ? (
				<ul className='block ml-2 my-2'>
					{author.articles.map(article => (
						<li key={article.name} className=' inline-block list-none mr-2'>
							<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
								{article.name}
							</p>
						</li>
					))}
				</ul>
			) : (
				<ul className='block ml-2 my-2'>
					<li className=' inline-block list-none mx-2'>
						<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
							Статей нет
						</p>
					</li>
				</ul>
			)}
			<button
				className='admin-btn ml-2 my-2'
				onClick={() => {
					setTarget(author?.id)
					deleteAuthor()
				}}
			>
				Удалить
			</button>
		</div>
	)
}

export default AuthorElement
