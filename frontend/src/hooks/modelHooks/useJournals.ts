import { JournalService } from '@/services/journal/journal.service'
import { IJournal } from '@/types/journal.interface'
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'
import { useAuth } from '../useAuth'

export function useJournals() {
	const { user } = useAuth()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get journals'],
		queryFn: () => JournalService.getAll(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading, refetch }
}

export const DeleteJournal = (
	id: number,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IJournal[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['delete journal'],
		mutationFn: () => JournalService.delete(id),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}

export const CreateJournal = (
	name: string,
	year: number | undefined,
	number: number | undefined,
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IJournal[], Error>>
) => {
	const { mutate, error: err } = useMutation({
		mutationKey: ['create journal'],
		mutationFn: () => JournalService.create(name, year, number),
		onSuccess() {
			refetch()
		},
		onError(error) {
			console.log(error)
		}
	})

	return { mutate, err }
}
