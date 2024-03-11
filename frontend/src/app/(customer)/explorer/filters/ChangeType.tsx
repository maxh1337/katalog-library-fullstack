import { useActions } from '@/hooks/useActions'
import { useGetType } from '@/hooks/useChangeType'
import Checkbox from '@/ui/checkbox/Checkbox'
import { FC } from 'react'
import FilterWrapper from './FilterWrapper'

const ChangeType: FC = () => {
	const type = useGetType()

	const { changeCurrentType } = useActions()

	return (
		<FilterWrapper title='Поиск по'>
			<Checkbox
				isChecked={type === 'article' ? true : false}
				onClick={() => changeCurrentType({ type: 'article' })}
				className='mb-2 text-sm'
			>
				Статьи
			</Checkbox>
			<Checkbox
				isChecked={type === 'newspaper' ? true : false}
				onClick={() => changeCurrentType({ type: 'newspaper' })}
				className='mb-2 text-sm'
			>
				Газеты
			</Checkbox>
			<Checkbox
				isChecked={type === 'journal' ? true : false}
				onClick={() => changeCurrentType({ type: 'journal' })}
				className='mb-2 text-sm'
			>
				Журналы
			</Checkbox>
		</FilterWrapper>
	)
}

export default ChangeType
