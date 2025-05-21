import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slide1Bg = 'https://images.unsplash.com/photo-1651827684507-12e7c6675ea3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const slide2Bg = 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5';
const slide3Bg = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2';

export const Home = () => {
    return (
        <div className="relative w-full h-[700px]">
            {/* Custom Swiper Navigation Styles */}
            <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                    color: #124a2f !important;
                    background-color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                    margin-top: -20px;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background-color: #f8f8f8;
                }
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    font-size: 20px !important;
                    font-weight: bold;
                }
                .swiper-button-next {
                    right: 10px !important;
                }
                .swiper-button-prev {
                    left: 10px !important;
                }
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.7 !important;
                }
                .swiper-pagination-bullet-active {
                    background: #124a2f !important;
                    opacity: 1 !important;
                }

                /* Animation for slide content */
                .slide-content {
                    opacity: 0;
                    transform: translateX(-50px);
                    animation: slideIn 0.8s forwards 0.3s;
                }

                @keyframes slideIn {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Delay animations for child elements */
                .slide-content h2 {
                    animation-delay: 0.4s;
                }
                .slide-content p {
                    animation-delay: 0.6s;
                }
                .slide-content .buttons {
                    animation-delay: 0.8s;
                }
                .slide-content .details {
                    animation-delay: 1s;
                }
            `}</style>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {/* Slide 1 - Community Gardening Event */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide1Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Community Gardening Day</h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Join us this Saturday for our monthly community gardening event. Learn composting techniques and plant seasonal vegetables.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                                    Register Now
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300">
                                    Learn More
                                </button>
                            </div>
                            <div className="mt-6 flex items-center gap-4 details">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    May 25, 2024 | 9:00 AM
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Central Community Garden
                                </span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 - Hydroponics Workshop */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide2Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hydroponics Workshop</h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Discover the future of gardening! Our expert-led workshop will teach you how to grow plants without soil.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                                    Book Your Spot
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300">
                                    View Details
                                </button>
                            </div>
                            <div className="mt-6 flex items-center gap-4 details">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    June 8, 2024 | 2:00 PM
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Green Thumb Innovation Center
                                </span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 - Balcony Garden Competition */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide3Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Balcony Garden Competition</h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Show off your small-space gardening skills! Enter our competition for the most beautiful balcony garden.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                                    Enter Now
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300">
                                    Competition Rules
                                </button>
                            </div>
                            <div className="mt-6 flex items-center gap-4 details">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Submissions until June 30, 2024
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    $500 Prize for the Winner
                                </span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


            
        </div>
    )
}