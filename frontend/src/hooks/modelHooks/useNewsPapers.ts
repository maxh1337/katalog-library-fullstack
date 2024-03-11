import { NewsPaperService } from '@/services/newspaper/newspaper.service'
import { IJournal } from '@/types/journal.interface'
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'
import { useAuth } from '../useAuth'

export function useNewsPapers() {
	const { user } = useAuth()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get newspapers'],
		queryFn: () => NewsPaperService.getAll(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading, refetch }
}

export const DeleteNewspaper = (
	id: number,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IJournal[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['delete newpaper'],
		mutationFn: () => NewsPaperService.delete(id),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const CreateNewspaper = (
	name: string,
	year: number | undefined,
	number: number | undefined,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IJournal[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create newpaper'],
		mutationFn: () => NewsPaperService.create(name, year, number),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}
