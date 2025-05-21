import { FaStar } from 'react-icons/fa6'
import ImgTag from '../ImageTag/ImageTag'

type CommentsType = {
    date: Date
    comment: string
    rating: number
    name: string
}

export default function Comments({ date, comment, rating, name }: CommentsType) {
    return (
        <article itemProp="review" itemScope itemType="http://schema.org/Review" className='relative pl-10'>
            <div className='w-12 lg:w-14 absolute left-9 transform -translate-x-1/2 top-1 lg:top-3 p-1 dark:border-bg-dark dark:bg-custom-dark bg-slate-200 border rounded-full'>
                <ImgTag className='rounded-full w-full h-auto shadow-md' src={"/semicolon-image.png"} alt={name} />
            </div>
            <div className='border border-gray-300 dark:border-bg-dark my-2 rounded-sm shadow-sm dark:shadow-full-dark pl-7 lg:pl-10 pr-2 lg:pr-3 py-2 lg:py-5'>
                <div className='flex w-full justify-between mb-3'>
                    <header className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <h3 itemProp="author" className='text-sm lg:text-base text-gray-700 dark:text-h-dark'>{name}</h3>
                            <div className='flex'>{[...Array(Math.round(Number(rating)))].map((_, index) => (
                                <FaStar key={index} className="text-yellow-400 text-sm" />
                            ))}
                            </div>
                            <span>({rating})</span>
                        </div>
                        <time itemProp="datePublished" dateTime={new Date(date).toLocaleDateString("en")} className='text-[0.60rem] lg:text-xs text-gray-500 italic dark:text-s-dark'>{new Date(date).toLocaleDateString("en")}</time>
                    </header>
                </div>
                <div className='text-justify text-sm text-gray-700 pl-2 dark:text-p-dark'>
                    <p itemProp="reviewBody">{comment}</p>
                </div>
            </div>
        </article>
    )
}
