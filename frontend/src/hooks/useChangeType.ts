import { useTypedSelector } from './useTypedSelector'

export const useGetType = () => {
	const type = useTypedSelector(state => state.changeType)

	return type.type
}
