'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './carousel.css'
import { Autoplay, Navigation } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

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
				<Link href="/album/its-a-message-for-you">
					<Image
						src="https://cdn.gengo-parade.com/images/cfcd026.png"
						alt="Slider It's A Message For You Album Cover"
						width={1920}
						height={500}
					/>
				</Link>
			</SwiperSlide>
			<SwiperSlide>
				<Link href="/album/votre-chateau">
					<Image
						src="https://cdn.gengo-parade.com/images/cfcd025.png"
						alt="Slider Votre Chateau Album Cover"
						width={1920}
						height={500}
					/>
				</Link>
			</SwiperSlide>
			<SwiperSlide>
				<Link href="/album/dear-my-days">
					<Image
						src="https://cdn.gengo-parade.com/images/cfcd027.png"
						alt="Slider Dear My Days Album Cover"
						width={1920}
						height={500}
					/>
				</Link>
			</SwiperSlide>
			<SwiperSlide>
				<Link href="/album/make-a-toast">
					<Image
						src="https://cdn.gengo-parade.com/images/nnpc002.png"
						alt="Slider Make A Toast! Album Cover"
						width={1920}
						height={500}
					/>
				</Link>
			</SwiperSlide>
		</Swiper>
	)
}
