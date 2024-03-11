import { Metadata } from 'next'
import ProductExplorer from './(customer)/explorer/ProductExplorer'

export const metadata: Metadata = {
	description: 'Articles library'
}

export const revalidate = 60

export default async function HomePage() {
	return <ProductExplorer />
}
