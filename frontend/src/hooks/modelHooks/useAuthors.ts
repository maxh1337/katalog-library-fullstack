import { AuthorService } from '@/services/author/author.service'
import { IAuthor } from '@/types/author.interface'
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'
import { useAuth } from '../useAuth'

export function useAuthors() {
	const { user } = useAuth()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get authors'],
		queryFn: () => AuthorService.getAll(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading, refetch }
}

export const DeleteAuthor = (
	id: number,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IAuthor[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['delete author'],
		mutationFn: () => AuthorService.delete(id),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const CreateAuthor = (
	name: string,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IAuthor[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create author'],
		mutationFn: () => AuthorService.create(name),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const UpdateAuthor = (
	id: number,
	name: string,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IAuthor[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create author'],
		mutationFn: () => AuthorService.update(id, name),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}
