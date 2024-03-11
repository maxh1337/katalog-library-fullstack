import { IPageIdParam } from '@/types/page-params'

import { CategoryService } from '@/services/category.service'
import { Metadata } from 'next'
import CategoryId from './CategoryId'

export const revalidate = 60

export async function generateStaticParams() {
	const { data } = await CategoryService.getAll()

	const paths = data?.map(category => {
		return {
			params: { id: category.id }
		}
	})
	return paths
}

export async function generateMetadata({
	params
}: IPageIdParam): Promise<Metadata> {
	const { data: category } = await CategoryService.getById(params?.id as number)

	return {
		title: category.name,
		description: `${category.name}`,
		openGraph: {
			description: `${category.name}`
		}
	}
}

export default async function CategoryPage({ params }: IPageIdParam) {
	return <CategoryId params={params} />
}
