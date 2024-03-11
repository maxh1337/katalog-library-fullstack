import { FC, useState } from 'react'

import { DeleteJournal } from '@/hooks/modelHooks/useJournals'
import { DeleteNewspaper } from '@/hooks/modelHooks/useNewsPapers'
import { IJournal } from '@/types/journal.interface'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface IJournalElementProps {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IJournal[], Error>>
	journal: IJournal
	type: 'journal' | 'newsPaper'
}

const JournalAndNewPaperElement: FC<IJournalElementProps> = ({
	journal,
	refetch,
	type
}) => {
	const [target, setTarget] = useState<number>(0)

	const { mutate: deleteJournal } = DeleteJournal(target, refetch)
	const { mutate: deleteNewsPaper } = DeleteNewspaper(target, refetch)

	return (
		<div className='animate-scaleIn'>
			<h3 className='mt-2 font-semibold text-white text-xl pb-2'>
				«{journal?.name}»
			</h3>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>id:</dt>
				<dt className=' ml-2 text-white'>
					{journal?.id ? journal?.id : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Номер журнала:</dt>
				<dt className=' ml-2 text-white '>
					{journal?.number ? journal?.number : ' — '}
				</dt>
			</div>
			{journal.articles.length ? (
				<ul className='block ml-2 my-2'>
					{journal.articles.map(article => (
						<li key={article.name} className=' inline-block list-none mr-2'>
							<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
								{article.name}
							</p>
						</li>
					))}
				</ul>
			) : (
				<li className=' inline-block list-none mx-2 my-2'>
					<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
						Статей нет
					</p>
				</li>
			)}
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Дата выпуска:</dt>
				<dt className=' ml-2 text-white'>{journal?.year}</dt>
			</div>
			<button
				className='admin-btn ml-2 my-2'
				onClick={() => {
					setTarget(journal?.id)

					if (type === 'journal') {
						deleteJournal()
					} else {
						deleteNewsPaper()
					}
				}}
			>
				Удалить
			</button>
		</div>
	)
}

export default JournalAndNewPaperElement
