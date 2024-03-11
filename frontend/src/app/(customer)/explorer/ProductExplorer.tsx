'use client'

import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { FC, useState } from 'react'

import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import Catalog from '@/ui/catalog/Catalog'

import Search from '@/app/layout/header/Search'
import { useGetType } from '@/hooks/useChangeType'
import { ArticleService } from '@/services/article/article.service'
import { JournalService } from '@/services/journal/journal.service'
import { NewsPaperService } from '@/services/newspaper/newspaper.service'
import AnotherCatalog from '@/ui/catalog/AnotherCatalog'
import styles from './ProductExplorer.module.scss'
import Filters from './filters/Filters'
import { useFilters } from './useFilters'

const ProductExplorer: FC = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const type = useGetType()

	const { isFilterUpdated, queryParams } = useFilters()

	const {
		data: articles,
		isLoading: isLoading1,
		refetch: refetch1
	} = useQuery({
		queryKey: ['article explorer', queryParams],
		queryFn: () => ArticleService.getAll(queryParams),
		select: ({ data }) => data,
		enabled: isFilterUpdated
	})

	const {
		data: journals,
		isLoading: isLoading2,
		refetch: refetch2
	} = useQuery({
		queryKey: ['journal explorer', queryParams],
		queryFn: () => JournalService.getAll(queryParams),
		select: ({ data }) => data,
		enabled: isFilterUpdated
	})

	const {
		data: newspapers,
		isLoading: isLoading3,
		refetch: refetch3
	} = useQuery({
		queryKey: ['newspaper explorer', queryParams],
		queryFn: () => NewsPaperService.getAll(queryParams),
		select: ({ data }) => data,
		enabled: isFilterUpdated
	})

	return (
		<>
			<div className='flex items-center justify-between mb-7'>
				<Heading className='text-white'>
					{queryParams.searchTerm
						? `Результаты поиска по "${queryParams.searchTerm}"`
						: `Поиск`}
				</Heading>
			</div>
			<Search
				refetch={
					type === 'article'
						? refetch1
						: type === 'journal'
							? refetch2
							: refetch3
				}
			/>
			<Button
				variant='red'
				onClick={() => setIsFilterOpen(!isFilterOpen)}
				className='mb-7'
			>
				{isFilterOpen ? 'Закрыть' : 'Открыть'} фильтры
			</Button>

			<div
				className={cn(styles.explorer, {
					[styles.filterOpened]: isFilterOpen
				})}
			>
				<aside>
					<Filters
						refetch={
							type === 'article'
								? refetch1
								: type === 'journal'
									? refetch2
									: refetch3
						}
					/>
				</aside>

				<section>
					{type === 'article' ? (
						<Catalog data={articles} isLoading={isLoading1} />
					) : (
						<AnotherCatalog
							data={type === 'journal' ? journals : newspapers}
							isLoading={type === 'journal' ? isLoading2 : isLoading3}
						/>
					)}
				</section>
			</div>
		</>
	)
}

export default ProductExplorer
