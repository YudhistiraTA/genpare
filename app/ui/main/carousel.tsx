'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './carousel.css'
import { Autoplay, Navigation } from 'swiper/modules'
import Image from 'next/image'

export default function Carousel() {
	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={30}
			loop={true}
			pagination={{
				clickable: true,
			}}
			autoplay={{
				delay: 2500,
				disableOnInteraction: true,
			}}
			navigation={true}
			modules={[Autoplay, Navigation]}
			className="mySwiper"
		>
			<SwiperSlide>
				<Image
					src="https://cdn.gengo-parade.com/images/its-a-message-for-you.webp"
					alt="test image"
					width={480}
					height={480}
					objectFit="contain"
				/>
				Album title and details here
			</SwiperSlide>
			<SwiperSlide>Slide 2</SwiperSlide>
			<SwiperSlide>Slide 3</SwiperSlide>
			<SwiperSlide>Slide 4</SwiperSlide>
			<SwiperSlide>Slide 5</SwiperSlide>
			<SwiperSlide>Slide 6</SwiperSlide>
			<SwiperSlide>Slide 7</SwiperSlide>
			<SwiperSlide>Slide 8</SwiperSlide>
			<SwiperSlide>Slide 9</SwiperSlide>
		</Swiper>
	)
}
