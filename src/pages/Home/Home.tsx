import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllData } from '../../services/home';
import type { GetAllProduct } from '../../type';

import SliderImage from '../../components/SliderImage/SliderImage';
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
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
  console.log(data);

  return (
    <div className='my-6 w-11/12 mx-auto'>
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">نمایش محصولات</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="نمایش محصولات"
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
      <div className='grid grid-cols-3 gap-5 my-12'>
        {data?.pages[0]?.products.length ? data?.pages[0]?.products.map((item, index) => (
          <div key={index} className='p-3 shadow rounded-xl bg-white'>
            <span>{item.title}</span>
            <SliderImage images={item.images} />
            <p>{item.description}</p>
          </div>
        )) : null}
      </div>
      <div >
        {data?.pages[0].total ?
          <Pagination
            className='w-full flex justify-center'
            count={Math.ceil(Number(data?.pages[0].total) / Number(data?.pages[0].limit))}
            onChange={(_e, value) =>
              navigate(`?limit=${limit}&skip=${value}`)
            }
            siblingCount={2}
            color="primary"
            variant="text"
            page={Number(skip)}
            size='large'
            shape="circular"
          />
          : null}

      </div>

    </div>
  )
}
