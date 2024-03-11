import { Metadata } from 'next'
import AdminPage from './AdminPage'

export const metadata: Metadata = {
	description: 'Admin Panel',
	title: 'Admin | Library'
}

const Page = () => {
	return <AdminPage />
}
export default Page
