import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllData } from '../../services/home';
import type { GetAllProduct } from '../../type';
import SliderImage from '../../components/SliderImage/SliderImage';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import queryString from 'query-string';
import Discount from '../../components/Discount/Discount';
export default function Home() {
  const [query, setQuery] = useState<string>('')
  const { search } = useLocation();
  let { skip = 1, limit = 10 } = queryString.parse(search) as any;
  const navigate = useNavigate();
  const { data } = useInfiniteQuery<GetAllProduct>({
    queryKey: ["GetAllData", query],
    queryFn: () => getAllData(query),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage) => lastPage.skip || undefined,
    initialPageParam: "",
  });
  useEffect(() => {
    setQuery(search);
  }, [search]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (!data) {
    return <div className='w-full h-dvh flex justify-center items-center'>
      <p className='text-lg font-bold'>
        Loading...

      </p>
    </div>
  }
  return (
    <div className='my-6'>
      <div className=' w-11/12 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-12'>
          {data?.pages[0]?.products.length ? data?.pages[0]?.products.map((item, index) => (
            <div key={index} className='p-3 relative shadow rounded-xl bg-white flex flex-col gap-5'>
              <div className='absolute right-3 top-3 rounded-md p-1 px-3 bg-gray-300/30 flex items-center justify-center gap-1 shadow'>
                <span> {item.rating} </span>
                <FaStar className='text-yellow-500 text-lg inline' />
              </div>
              <span className='font-bold text-lg'>{item.title}</span>
              <SliderImage images={item.images} />
              <div className='flex justify-between items-center  text-sm'>
                <span className='bg-gray-200/50 p-2 px-4 rounded-full shadow'>{item.brand}</span>
                <span className='flex justify-center items-center text-lg gap-1'>
                  <Discount discount={item.discountPercentage} price={item.price} />
                </span>
              </div>
              <p className='cutline cutline-3 text-gray-600'>{item.description}</p>
              <div>
                <Link className='bg-gray-800  hover:bg-gray-900 transition-all text-white py-2 px-6 rounded-md shadow flex justify-center items-center w-full md:w-1/3' to={`/${item.id}`}>
                  View More
                </Link>
              </div>
            </div>
          )) : null}
        </div>
        <div className='mb-5'>
          <Box sx={{ width: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Show products</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Show products"
                value={Number(limit)}
                onChange={(e) =>
                  navigate(`?limit=${e.target.value}&skip=${skip}`)
                }
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {data?.pages[0].total ?
        <Pagination
          className='w-full gap-1 flex justify-center'
          count={Math.ceil(Number(data?.pages[0].total) / Number(data?.pages[0].limit))}
          onChange={(_e, value) =>
            navigate(`?limit=${limit}&skip=${value}`)
          }
          siblingCount={isMobile ? 1 : 2}
          color="primary"
          variant="text"
          page={Number(skip)}
          size={isMobile ? 'medium' : 'large'}
          shape="circular"
        />
        : null}
    </div>

  )
}
