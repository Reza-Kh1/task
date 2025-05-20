import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ImgTag from '../ImageTag/ImageTag';

export default function SliderImage({ images }: { images: string[] }) {
    return (
        <div className="w-full max-w-lg mx-auto">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}><ImgTag alt={"test"}  classPlus='h-64 w-full object-contain' src={item} /> </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}
