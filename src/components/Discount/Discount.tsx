import { FaDollarSign } from 'react-icons/fa'
type DiscountType = {
    discount?: number | null
    price?: number
}
export default function Discount({ discount, price }: DiscountType) {
    const discountedPrice = Number(discount) ? (Number(price) * (1 - Number(discount) / 100)).toFixed(2) : Number(price)
    return (
        <div className='relative'>
            {discount ?
                (<>
                    <span className='absolute -top-4 left-0 line-through text-gray-400 text-sm'>{price}$</span>
                    <span className=' text-lg'>{discountedPrice}<FaDollarSign className='text-green-700 inline text-sm' /></span>
                </>)
                :
                <span className=' text-lg'>{price}<FaDollarSign className='text-green-700 inline text-sm' /></span>
            }
        </div>
    )
}
