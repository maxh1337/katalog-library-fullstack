import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import { CategoryService } from '@/services/category.service'
import { ICategory } from '@/types/category.interface'
import { useAuth } from '../useAuth'

export function useCategories() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: ({ data }) => data
	})
	return { data, isLoading, refetch }
}

export function useCategoryById(id: number) {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['get category by id'],
		queryFn: () => CategoryService.getById(id),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading }
}

export const DeleteCategory = (
	id: number,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<ICategory[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: () => CategoryService.delete(id),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const CreateCategory = (
	name: string,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<ICategory[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create category'],
		mutationFn: () => CategoryService.create(name),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}
