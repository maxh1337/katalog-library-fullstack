import { FC } from 'react'

import Range from '@/ui/range/Range'

import { useFilters } from '../../useFilters'
import FilterWrapper from '../FilterWrapper'

export interface IRefetch {
	refetch: any
}

const YearGroup: FC<IRefetch> = ({ refetch }) => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<FilterWrapper title='Год'>
			<Range
				max={2024}
				fromInitialValue={queryParams.yearFrom}
				toInitialValue={queryParams.yearTo}
				onChangeFromValue={value => updateQueryParams('yearFrom', value)}
				onChangeToValue={value => updateQueryParams('yearTo', value)}
				refetch={refetch}
			/>
		</FilterWrapper>
	)
}

export default YearGroup
