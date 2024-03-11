'use client'
import { useArticlesByCategoryId } from '@/hooks/modelHooks/useArticles'
import { useCategoryById } from '@/hooks/modelHooks/useCategories'
import { IPageIdParam, TypeParamId } from '@/types/page-params'
import Catalog from '@/ui/catalog/Catalog'

function getArticles(params: TypeParamId) {
	const { data: articles } = useArticlesByCategoryId(params?.id as number)

	const { data: category } = useCategoryById(params?.id as number)

	return { articles, category }
}

function CategoryId({ params }: IPageIdParam) {
	const { articles, category } = getArticles(params)

	console.log(articles, category)

	return <Catalog data={articles || []} title={category?.name} />
}
export default CategoryId
