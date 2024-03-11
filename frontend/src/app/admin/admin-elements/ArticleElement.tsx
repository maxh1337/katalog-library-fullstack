import { FC, useState } from 'react'

import { DeleteArticle } from '@/hooks/modelHooks/useArticles'
import { IArticle } from '@/types/article.interface'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface IArticleElementProps {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IArticle[], Error>>
	article: IArticle
}

const ArticleElement: FC<IArticleElementProps> = ({ article, refetch }) => {
	const [target, setTarget] = useState<number>(0)

	const { mutate } = DeleteArticle(target, refetch)

	return (
		<div className='animate-scaleIn'>
			<h3 className='mt-2 font-semibold text-white text-xl pb-2'>
				«{article.name}»
			</h3>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>id:</dt>
				<dt className=' ml-2 text-white'>
					{article?.id ? article?.id : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Категория:</dt>
				<dt className=' ml-2 text-white'>
					{article?.category?.name ? article?.category?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Автор:</dt>
				<dt className=' ml-2 text-white '>
					{article?.author?.name ? article?.author?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Журнал:</dt>
				<dt className=' ml-2 text-white '>
					{article.journal?.name ? article.journal?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Газета:</dt>
				<dt className=' ml-2 text-white '>
					{article.newsPaper?.name ? article.newsPaper?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Номер статьи:</dt>
				<dt className=' ml-2 text-white'>{article?.articleNumber}</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Начальная страница:</dt>
				<dt className=' ml-2 text-white'>{article?.startPage}</dt>
			</div>
			{article.keywords.length ? (
				<ul className='block ml-2 my-2'>
					{article.keywords.map(keyword => (
						<li key={keyword} className=' inline-block list-none mr-2'>
							<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
								{keyword}
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
				<dt className=' ml-2 text-white'>{article.year}</dt>
			</div>
			<button
				className='admin-btn ml-2 my-2'
				onClick={() => {
					setTarget(article.id)
					mutate()
				}}
			>
				Удалить
			</button>
		</div>
	)
}

export default ArticleElement
