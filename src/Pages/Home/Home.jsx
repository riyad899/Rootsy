import React from 'react';
import { Autoplay, Pagination, Navigation, EffectFade, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';

const slide1Bg = 'https://images.unsplash.com/photo-1651827684507-12e7c6675ea3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const slide2Bg = 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5';
const slide3Bg = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2';

export const Home = () => {
    return (
        <div className="relative w-full h-[700px]">
            {/* Enhanced Custom Styles with More Animations */}
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
                    opacity: 0.7;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background-color: #f8f8f8;
                    opacity: 1;
                    transform: scale(1.1);
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
                    width: 12px;
                    height: 12px;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet:hover {
                    opacity: 1 !important;
                    transform: scale(1.2);
                }
                .swiper-pagination-bullet-active {
                    background: #124a2f !important;
                    opacity: 1 !important;
                    transform: scale(1.2);
                }

                /* Slide background zoom effect */
                .swiper-slide {
                    overflow: hidden;
                }
                .swiper-slide > div {
                    width: 100%;
                    height: 100%;
                    transition: transform 12s ease-out;
                    background-size: cover;
                    background-position: center;
                }
                .swiper-slide-active > div {
                    transform: scale(1.1);
                }

                /* Animation for slide content */
                .slide-content {
                    opacity: 0;
                    transform: translateY(30px);
                }
                .swiper-slide-active .slide-content {
                    animation: fadeInUp 1s forwards 0.3s;
                }

                /* Text animation effects */
                .swiper-slide-active .slide-content h2 {
                    animation: textFadeIn 1.2s forwards 0.4s, textGlow 3s infinite 1.6s;
                }
                .swiper-slide-active .slide-content p {
                    animation: fadeInUp 1s forwards 0.6s, textFloat 6s ease-in-out infinite 1.6s;
                }
                .swiper-slide-active .slide-content .buttons {
                    animation: fadeInUp 1s forwards 0.8s;
                }
                .swiper-slide-active .slide-content .details {
                    animation: fadeInUp 1s forwards 1s;
                }
                .swiper-slide-active .slide-content .details span {
                    animation: fadeInUp 0.6s forwards, float 4s ease-in-out infinite;
                    animation-delay: calc(0.1s * var(--i) + 1s);
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes textFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                        letter-spacing: -0.5em;
                    }
                    60% {
                        letter-spacing: 0.1em;
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                        letter-spacing: normal;
                    }
                }

                @keyframes textGlow {
                    0% {
                        text-shadow: 0 0 5px rgba(255,255,255,0.2);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(255,255,255,0.4);
                    }
                    100% {
                        text-shadow: 0 0 5px rgba(255,255,255,0.2);
                    }
                }

                @keyframes textFloat {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                /* Button hover effects */
                .slide-content button {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    transform: translateY(0);
                }
                .slide-content button:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }
                .slide-content button::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 5px;
                    height: 5px;
                    background: rgba(255,255,255,0.5);
                    opacity: 0;
                    border-radius: 100%;
                    transform: scale(1, 1) translate(-50%);
                    transform-origin: 50% 50%;
                }
                .slide-content button:focus:not(:active)::after {
                    animation: ripple 1s ease-out;
                }
                @keyframes ripple {
                    0% {
                        transform: scale(0, 0);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(20, 20);
                        opacity: 0;
                    }
                }

                /* Floating elements effect */
                .details span {
                    display: inline-block;
                    transition: all 0.3s ease;
                    --i: 0;
                }
                .details span:hover {
                    transform: translateY(-5px) scale(1.05);
                }

                /* Pulse animation for important elements */
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                .highlight-pulse {
                    animation: pulse 2s infinite;
                }

                /* Slide transition effects */
                .swiper-slide {
                    transition: opacity 1s ease, transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
                }
                .swiper-slide-prev,
                .swiper-slide-next {
                    opacity: 0.5;
                    transform: scale(0.9);
                }

                /* Creative effect for slide transitions */
                .swiper-slide-shadow-left,
                .swiper-slide-shadow-right {
                    background: linear-gradient(to right, rgba(0,0,0,0.5), transparent);
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
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade, EffectCreative]}
                className="mySwiper h-full"
                effect="creative"
                speed={1200}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-20%', 0, -1],
                        opacity: 0.4
                    },
                    next: {
                        translate: ['100%', 0, 0],
                        opacity: 0
                    }
                }}
                fadeEffect={{
                    crossFade: true
                }}
                grabCursor={true}
                loop={true}
            >
                {/* Slide 1 - Community Gardening Event */}
                <SwiperSlide>
                    <div
                        className="w-full h-full flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide1Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Community <span className="text-green-300 highlight-pulse">Gardening</span> Day
                            </h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Join us this Saturday for our monthly community gardening event. Learn composting techniques and plant seasonal vegetables.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    Register Now
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    Learn More
                                </button>
                            </div>
                            <div className="mt-6 flex  flex-wrap gap-4 details ">
                                <span className="flex items-center gap-2 bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 0 }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    May 25, 2024 | 9:00 AM
                                </span>
                                <span className="flex items-center gap-2 bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 1 }}>
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
                        className="w-full h-full flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide2Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="text-blue-200 highlight-pulse">Hydroponics</span> Workshop
                            </h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Discover the future of gardening! Our expert-led workshop will teach you how to grow plants without soil.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    Book Your Spot
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    View Details
                                </button>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 details">
                                <span className="flex items-center gap-2 bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 0 }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    June 8, 2024 | 2:00 PM
                                </span>
                                <span className="flex items-center gap-2 bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 1 }}>
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
                        className="w-full h-full flex items-center xl:pl-[100px]"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide3Bg})` }}
                    >
                        <div className="container mx-auto px-6 text-white slide-content">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Balcony <span className="text-yellow-200 highlight-pulse">Garden</span> Competition
                            </h2>
                            <p className="text-xl mb-6 max-w-2xl">
                                Show off your small-space gardening skills! Enter our competition for the most beautiful balcony garden.
                            </p>
                            <div className="flex flex-wrap gap-4 buttons">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    Enter Now
                                </button>
                                <button className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-medium transition duration-300 relative overflow-hidden">
                                    Competition Rules
                                </button>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 details">
                                <span className="flex items-center gap-2  bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 0 }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Submissions until June 30, 2024
                                </span>
                                <span className="flex items-center gap-2 bg-opacity-30 px-3 py-1 rounded-full" style={{ '--i': 1 }}>
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