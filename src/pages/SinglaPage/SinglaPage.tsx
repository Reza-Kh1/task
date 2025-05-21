import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProductType } from '../../type';
import { getProduct } from '../../services/singlePage';
import SliderImage from '../../components/SliderImage/SliderImage';
import { FaCartPlus, FaStar, FaTag } from 'react-icons/fa6';
import { MdCategory } from "react-icons/md";
import { FaRegCheckCircle } from 'react-icons/fa';
import Discount from '../../components/Discount/Discount';
import Comments from '../../components/Comments/Comments';

export default function SinglaPage() {
  const { slug = 1 } = useParams()
  const navigate = useNavigate()
  const { data } = useQuery<ProductType>({
    queryKey: ["Product", slug],
    queryFn: () => getProduct(Number(slug)),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
  const DetailBox = ({ name, value }: { name: string, value?: string | number }) => {
    return <div className='flex w-full gap-3 justify-between bg-gray-600/70 rounded-md p-3 shadow'>
      <span>{name}:</span>
      <span>{value || ''}</span>
    </div>
  }
  if (!data) {
    return <div className='w-full h-dvh flex justify-center items-center'>
      <p className='text-lg font-bold'>
        Loading...

      </p>
    </div>
  }
  return (
    <div className='md:my-12 bg-white w-full md:w-7/12 mx-auto shadow rounded-xl p-4 md:p-8 flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{data?.title}</h1>
        <button type='button' className='py-1 hover:shadow px-6 rounded-full cursor-pointer bg-gray-100' onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className='flex w-full justify-between'>
        <div className='flex items-center gap-2'>
          <MdCategory />
          <span>{data?.category}</span>
        </div>
        <div className='flex items-center gap-2'>
          <FaTag />
          <span>{data?.tags.map((i, index) => index === 0 ? i : ' , ' + i)}</span>
        </div>
      </div>
      <div className=''>
        <SliderImage images={data?.images} />
      </div>
      <div className='grid grid-cols-2 justify-between gap-3'>
        <div className='flex gap-2 items-center'>
          <span className='t'>Brand :</span>
          <span className='bg-gray-300/30 shadow p-1 px-4 rounded-full '>{data?.brand}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <span>Price :</span>
          <Discount price={data?.price} discount={data?.discountPercentage} />
        </div>
        <div className='flex gap-2 items-center'>
          <span>Score :</span>
          <span>{data?.rating}</span>
          <FaStar className='text-yellow-300' />
        </div>
        <div className='flex gap-2 items-center'>
          <span>Available :</span>
          <span>{data?.availabilityStatus}</span>
          <FaRegCheckCircle className='text-green-600' />
        </div>
      </div>
      <div className='flex'>
        <div className='bg-gradient-to-b px-8 flex cursor-pointer transition-all items-center w-auto gap-2 rounded-md p-2 shadow-md to-gray-400 text-white from-gray-800'>
          <button type='button' className='cursor-pointer'>
            Add To Cart
          </button>
          <FaCartPlus />
        </div>
      </div>
      <div className='bg-gray-800/90 p-3 rounded-xl shadow text-white'>
        <span className='text-lg font-bold'>Description :</span>
        <p className='mt-1 mb-3'>{data?.description}</p>
        <div>
          <span className='text-lg font-bold'>Details:</span>
          <div className='flex flex-col my-5 gap-3'>
            <DetailBox name='Name Product' value={data?.title} />
            <DetailBox name='Brand' value={data?.brand} />
            <DetailBox name='AvailabilityStatus' value={data?.availabilityStatus} />
            <DetailBox name='BarCode' value={data?.meta.barcode} />
            <DetailBox name='Return Policy' value={data?.returnPolicy} />
            <DetailBox name='Shipping Information' value={data?.shippingInformation} />
            <DetailBox name='stock' value={data?.stock} />
            <DetailBox name='Warranty Information' value={data?.warrantyInformation} />
            <DetailBox name='Weight' value={data?.weight} />
            <DetailBox name='Dimensions Depth' value={data?.dimensions.depth + ' cm'} />
            <DetailBox name='Dimensions Height' value={data.dimensions.height + ' cm'} />
            <DetailBox name='Dimensions Width' value={data.dimensions.width + ' cm'} />
          </div>
        </div>
      </div>
      <section>
        <h3>Comments</h3>
        <div>
          {data?.reviews.map((i, index) => (
            <Comments key={index} comment={i.comment} date={i.date} name={i.reviewerName} rating={i.rating} />
          ))}
        </div>
      </section>
    </div>
  )
}
