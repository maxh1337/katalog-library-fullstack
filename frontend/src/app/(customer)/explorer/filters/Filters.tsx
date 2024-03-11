import { FC } from 'react'

import { useGetType } from '@/hooks/useChangeType'
import ChangeType from './ChangeType'
import CategoryGroup from './category-group/CategoryGroup'
import YearGroup, { IRefetch } from './year-group/PriceGroup'

const Filters: FC<IRefetch> = ({ refetch }) => {
	const type = useGetType()

	return (
		<div>
			<ChangeType />
			<YearGroup refetch={refetch} />
			{type === 'article' && <CategoryGroup />}
		</div>
	)
}

export default Filters
