'use client'
import { CreateArticle, useArticles } from '@/hooks/modelHooks/useArticles'
import { CreateAuthor, useAuthors } from '@/hooks/modelHooks/useAuthors'
import { CreateCategory, useCategories } from '@/hooks/modelHooks/useCategories'
import { CreateJournal, useJournals } from '@/hooks/modelHooks/useJournals'
import {
	CreateNewspaper,
	useNewsPapers
} from '@/hooks/modelHooks/useNewsPapers'
import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'
import cn from 'clsx'
import { FC, useState } from 'react'
import ArticleElement from './admin-elements/ArticleElement'
import AuthorElement from './admin-elements/AuthorElement'
import CategoryElement from './admin-elements/CategoryElements'
import JournalAndNewPaperElement from './admin-elements/JournalAndNewsPaperElement'

const allElements = [
	{ name: 'Articles' },
	{ name: 'Journals' },
	{ name: 'NewsPapers' },
	{ name: 'Categories' },
	{ name: 'Authors' }
]

const AdminPage: FC = () => {
	// Текущий выбранный элемент редактирования
	const [currentElement, setCurrentElement] = useState('Articles')

	// Инпут для создания статьи
	const [createArticleInputName, SetCreateArticleInputName] = useState('')
	const [createArticleInputCategory, SetCreateArticleInputCategory] =
		useState<number>()
	const [createArticleInputAuthor, SetCreateArticleInputAuthor] =
		useState<number>()
	const [createArticleInputJournal, SetCreateArticleInputJournal] =
		useState<number>()
	const [createArticleInputNewspaper, SetCreateArticleInputNewspaper] =
		useState<number>()
	const [createArticleInputArticleNumber, SetCreateArticleInputArticleNumber] =
		useState<number>()
	const [createArticleInputStartPage, SetCreateArticleInputStartPage] =
		useState<number>()
	const [createArticleInputYear, SetCreateArticleInputYear] =
		useState<number>(2024)
	// Инпуты для создания журнала или газеты
	const [createJournalName, SetCreateJournalName] = useState('')
	const [createJournalYear, SetCreateJournalYear] = useState<number>(2024)
	const [createJournalNumber, SetCreateJournalNumber] = useState<number>(1)

	// Инпут для создания категории
	const [createCategoryInput, SetCreateCategoryInput] = useState('')

	// Инпут для создания автора
	const [createAuthorInput, SetCreateAuthorInput] = useState('')

	const {
		data: articles,
		refetch: refetchArticles,
		isLoading: isLoadingArticles
	} = useArticles()

	const {
		data: journals,
		refetch: refetchJournals,
		isLoading: isLoadingJournals
	} = useJournals()

	const {
		data: newsPapers,
		refetch: refetchNewsPapers,
		isLoading: isLoadingNewsPapers
	} = useNewsPapers()

	const {
		data: categories,
		refetch: refetchCategories,
		isLoading: isLoadingCategories
	} = useCategories()

	const {
		data: authors,
		refetch: refetchAuthors,
		isLoading: isLoadingAuthors
	} = useAuthors()

	const { mutate: CreateArticleMutate } = CreateArticle(
		createArticleInputName,
		createArticleInputCategory,
		createArticleInputAuthor,
		createArticleInputJournal,
		createArticleInputNewspaper,
		createArticleInputArticleNumber,
		createArticleInputStartPage,
		createArticleInputYear,
		refetchArticles
	)

	const { mutate: CreateCategoryMutate } = CreateCategory(
		createCategoryInput,
		refetchCategories
	)

	const { mutate: CreateAuthorMutate } = CreateAuthor(
		createAuthorInput,
		refetchAuthors
	)

	const { mutate: CreateJournalMutate } = CreateJournal(
		createJournalName,
		createJournalYear,
		createJournalNumber,
		refetchJournals
	)

	const { mutate: CreateNewsPaperMutate } = CreateNewspaper(
		createJournalName,
		createJournalYear,
		createJournalNumber,
		refetchNewsPapers
	)

	const [isOpenCategory, setIsOpenCategory] = useState(false)
	const [isOpenAuthor, setIsOpenAuthor] = useState(false)

	return (
		<section>
			<Heading className='text-white mb-5'>
				Панель администрирования – {currentElement}
			</Heading>
			<div className=' flex gap-5 items-center'>
				<p className=' text-white'>Выберите элемент:</p>
				<div className=' gap-2 flex'>
					{allElements.map(element => (
						<button
							key={element.name}
							className={cn('admin-btn', {
								'admin-btn-active': currentElement === element.name
							})}
							onClick={() => setCurrentElement(element.name)}
						>
							{element.name}
						</button>
					))}
				</div>
			</div>
			{currentElement === 'Articles' ? (
				<>
					<div className='flex flex-col w-1/5'>
						<h1 className=' mt-8 text-white mb-2 font-medium text-lg'>
							Создать новую статью
						</h1>
						<input
							value={createArticleInputName}
							onChange={e => SetCreateArticleInputName(e.target.value)}
							type='text'
							placeholder='Название статьи'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createArticleInputCategory}
							onChange={e =>
								SetCreateArticleInputCategory(Number(e.target.value))
							}
							onClick={() => setIsOpenCategory(!isOpenCategory)}
							type='text'
							placeholder='Id категории'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						{isOpenCategory && (
							<div className='p-3 bg-gray1 border-red border rounded-lg h-full w-2/3 overflow-y-hidden mb-2 mx-auto'>
								<div className=' flex flex-col overflow-y-auto'>
									<p className='text-center text-white mb-1'>Категории</p>
									{categories?.map(category => (
										<div
											className=' flex border border-red rounded-lg mb-2 p-1  hover:cursor-pointer'
											onClick={() => SetCreateArticleInputCategory(category.id)}
											key={category.id}
										>
											<dt className=' text-gray2 mr-2'>id: {category.id}</dt>
											<dt className=' text-white'>{category.name}</dt>
										</div>
									))}
								</div>
							</div>
						)}
						<input
							value={createArticleInputAuthor}
							onChange={e =>
								SetCreateArticleInputAuthor(Number(e.target.value))
							}
							onClick={() => setIsOpenAuthor(!isOpenAuthor)}
							type='text'
							placeholder='Id автора'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						{isOpenAuthor && (
							<div className='p-3 bg-gray1 border-red border rounded-lg h-full w-2/3 overflow-y-hidden mb-2 mx-auto'>
								<div className=' flex flex-col overflow-y-auto'>
									<p className='text-center text-white mb-1'>Авторы</p>
									{authors?.map(author => (
										<div
											className=' flex border border-red rounded-lg mb-2 p-1  hover:cursor-pointer'
											onClick={() => SetCreateArticleInputAuthor(author.id)}
											key={author.id}
										>
											<dt className=' text-gray2 mr-2'>id: {author.id}</dt>
											<dt className=' text-white'>{author.name}</dt>
										</div>
									))}
								</div>
							</div>
						)}
						<input
							value={createArticleInputJournal}
							onChange={e =>
								SetCreateArticleInputJournal(Number(e.target.value))
							}
							type='text'
							placeholder='Id журнала'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createArticleInputNewspaper}
							onChange={e =>
								SetCreateArticleInputNewspaper(Number(e.target.value))
							}
							type='text'
							placeholder='Id газеты'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createArticleInputArticleNumber}
							onChange={e =>
								SetCreateArticleInputArticleNumber(Number(e.target.value))
							}
							type='text'
							placeholder='Номер статьи'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createArticleInputStartPage}
							onChange={e =>
								SetCreateArticleInputStartPage(Number(e.target.value))
							}
							type='text'
							placeholder='Начальная страница'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createArticleInputYear}
							onChange={e => SetCreateArticleInputYear(Number(e.target.value))}
							type='text'
							placeholder='Дата выпуска'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<button
							className='admin-btn my-2'
							onClick={() => {
								CreateArticleMutate()
								setTimeout(() => SetCreateArticleInputName(''), 500)
							}}
						>
							Создать
						</button>
					</div>
					<div className='grid grid-cols-4 gap-5 mt-10'>
						{isLoadingArticles ? (
							<Loader />
						) : (
							articles?.map(article => (
								<ArticleElement
									key={article.id}
									article={article}
									refetch={refetchArticles}
								/>
							))
						)}
					</div>
				</>
			) : currentElement === 'Journals' ? (
				<>
					<div className='flex flex-col w-1/5'>
						<h1 className=' mt-8 text-white mb-2 font-medium text-lg'>
							Создать новый журнал
						</h1>
						<input
							value={createJournalName}
							onChange={e => SetCreateJournalName(e.target.value)}
							type='text'
							placeholder='Имя журнала'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createJournalYear}
							onChange={e => SetCreateJournalYear(Number(e.target.value))}
							type='number'
							placeholder='Год выпуска'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createJournalNumber}
							onChange={e => SetCreateJournalNumber(Number(e.target.value))}
							type='number'
							placeholder='Номер журнала'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<button
							className='admin-btn my-2'
							onClick={() => {
								CreateJournalMutate()
								setTimeout(() => {
									SetCreateJournalName('')
									SetCreateJournalYear(2024)
									SetCreateJournalNumber(1)
								}, 500)
							}}
						>
							Создать
						</button>
					</div>
					<div className='grid grid-cols-4 gap-5 mt-10'>
						{isLoadingJournals ? (
							<Loader />
						) : (
							journals?.map(journal => (
								<JournalAndNewPaperElement
									type='journal'
									key={journal.id}
									journal={journal}
									refetch={refetchJournals}
								/>
							))
						)}
					</div>
				</>
			) : currentElement === 'NewsPapers' ? (
				<>
					<div className='flex flex-col w-1/5'>
						<h1 className=' mt-8 text-white mb-2 font-medium text-lg'>
							Создать новый газету
						</h1>
						<input
							value={createJournalName}
							onChange={e => SetCreateJournalName(e.target.value)}
							type='text'
							placeholder='Имя газеты'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createJournalYear}
							onChange={e => SetCreateJournalYear(Number(e.target.value))}
							type='number'
							placeholder='Год выпуска'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<input
							value={createJournalNumber}
							onChange={e => SetCreateJournalNumber(Number(e.target.value))}
							type='number'
							placeholder='Номер газеты'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<button
							className='admin-btn my-2'
							onClick={() => {
								CreateNewsPaperMutate()
								setTimeout(() => {
									SetCreateJournalName('')
									SetCreateJournalYear(2024)
									SetCreateJournalNumber(1)
								}, 500)
							}}
						>
							Создать
						</button>
					</div>
					<div className='grid grid-cols-4 gap-5 mt-10'>
						{isLoadingNewsPapers ? (
							<Loader />
						) : (
							newsPapers?.map(newsPaper => (
								<JournalAndNewPaperElement
									type='newsPaper'
									key={newsPaper.id}
									journal={newsPaper}
									refetch={refetchNewsPapers}
								/>
							))
						)}
					</div>
				</>
			) : currentElement === 'Categories' ? (
				<>
					<div className='flex flex-col w-1/5'>
						<h1 className=' mt-8 text-white mb-2 font-medium text-lg'>
							Создать новую категорию
						</h1>
						<input
							value={createCategoryInput}
							onChange={e => SetCreateCategoryInput(e.target.value)}
							type='text'
							placeholder='Название категории'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<button
							className='admin-btn my-2'
							onClick={() => {
								CreateCategoryMutate()
								setTimeout(() => SetCreateCategoryInput(''), 500)
							}}
						>
							Создать
						</button>
					</div>
					<div className='grid grid-cols-4 gap-5 mt-10'>
						{isLoadingCategories ? (
							<Loader />
						) : (
							categories?.map(category => (
								<CategoryElement
									key={category.id}
									category={category}
									refetch={refetchCategories}
								/>
							))
						)}
					</div>
				</>
			) : (
				<>
					<div className='flex flex-col w-1/5'>
						<h1 className=' mt-8 text-white mb-2 font-medium text-lg'>
							Создать нового автора
						</h1>
						<input
							value={createAuthorInput}
							onChange={e => SetCreateAuthorInput(e.target.value)}
							type='text'
							placeholder='Имя автора'
							className=' bg-gray1 mb-2 border-white border rounded-lg p-1 text-white placeholder:text-gray2'
						/>
						<button
							className='admin-btn my-2'
							onClick={() => {
								CreateAuthorMutate()
								setTimeout(() => SetCreateAuthorInput(''), 500)
							}}
						>
							Создать
						</button>
					</div>
					<div className='grid grid-cols-4 gap-5 mt-10'>
						{isLoadingAuthors ? (
							<Loader />
						) : (
							authors?.map(author => (
								<AuthorElement
									key={author.id}
									author={author}
									refetch={refetchAuthors}
								/>
							))
						)}
					</div>
				</>
			)}
		</section>
	)
}
export default AdminPage
