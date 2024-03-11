'use client'

import { useArticles } from '@/hooks/modelHooks/useArticles'
import Catalog from '@/ui/catalog/Catalog'
import { FC } from 'react'

const Home: FC = () => {
	const { data, isLoading } = useArticles()
	return (
		<>
			<Catalog title='Статьи' data={data} isLoading={isLoading} />
		</>
	)
}

export default Home
