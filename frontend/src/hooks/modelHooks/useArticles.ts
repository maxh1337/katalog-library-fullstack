'use client'

import { ArticleService } from '@/services/article/article.service'
import { IArticle } from '@/types/article.interface'
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'
import { useAuth } from '../useAuth'

export function useArticles() {
	const { user } = useAuth()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get articles'],
		queryFn: () => ArticleService.getAll(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading, refetch }
}

export function useArticlesByCategoryId(id: number) {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['get articles by id'],
		queryFn: () => ArticleService.getByCategoryId(id),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading }
}

export const DeleteArticle = (
	id: number,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IArticle[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['delete article'],
		mutationFn: () => ArticleService.delete(id),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const CreateArticle = (
	name: string,
	categoryId: number | undefined,
	authorId: number | undefined,
	journalId: number | undefined,
	newsPaperId: number | undefined,
	articleNumber: number | undefined,
	startPage: number | undefined,
	year: number | undefined,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IArticle[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create article'],
		mutationFn: () =>
			ArticleService.create(
				name,
				categoryId,
				authorId,
				journalId,
				newsPaperId,
				articleNumber,
				startPage,
				year
			),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}
