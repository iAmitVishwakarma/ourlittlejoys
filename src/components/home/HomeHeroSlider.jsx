import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import {
  SunDoodle,
  RainbowDoodle,
  StarDoodle,
  WavyUnderline,
} from '@/components/graphics/KidsDoodles';

export default function HomeHeroSlider({ slides = [] }) {
  const heroPrevRef = useRef(null);
  const heroNextRef = useRef(null);

  return (
    <section className="pt-2 sm:pt-4 md:pt-6 pb-2 px-2.5 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="relative group">
          <button
            ref={heroPrevRef}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-xs border border-white/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>

          <button
            ref={heroNextRef}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-xs border border-white/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: '.hero-swiper-pagination' }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = heroPrevRef.current;
              swiper.params.navigation.nextEl = heroNextRef.current;
            }}
            grabCursor={true}
            className="hero-swiper rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-amber-200/60 shadow-xs overflow-hidden"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={slide.id || idx}>
                <div className="w-full bg-linear-to-br from-[#FFFDF9] via-[#FAF4EB] to-brand-primary-50 py-5 sm:py-8 md:py-12 px-3.5 sm:px-8 md:px-14 relative overflow-hidden">
                  <SunDoodle className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400/70 absolute -top-1 -right-1 sm:top-3 sm:right-6 pointer-events-none" />
                  <RainbowDoodle className="w-8 h-5 text-rose-300/60 opacity-60 absolute top-4 left-6 sm:left-8 pointer-events-none hidden sm:block" />
                  <StarDoodle className="w-3.5 h-3.5 text-amber-400/60 absolute bottom-6 right-1/2 pointer-events-none hidden lg:block" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center relative z-10">
                    {/* Left Column */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-2.5 sm:space-y-4">
                      <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 sm:px-3 py-1 rounded-full border border-amber-200/70 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-xs">{slide.badgeEmoji || '🌿'}</span>
                        <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
                          {slide.badge}
                        </span>
                      </div>

                      <h2 className="text-[22px] xs:text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.14]">
                        {slide.title}
                        <br />
                        <span className="text-brand-primary relative inline-block">
                          {slide.highlight}
                          <WavyUnderline className="w-20 sm:w-24 h-1.5 text-[#C89B58] absolute -bottom-1 left-0 pointer-events-none" />
                        </span>
                      </h2>

                      <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-0.5 sm:pt-1 text-[11px] sm:text-xs font-semibold text-slate-700">
                        {slide.benefits?.map((benefit, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-slate-200/70 shadow-2xs text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span className="leading-tight">{benefit}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
                        <Link
                          to={slide.ctaLink || '/shop/all'}
                          className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold py-2.5 sm:py-3 px-6 sm:px-7 rounded-full text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-brand-primary/20 flex items-center justify-center gap-2 min-h-10.5 sm:min-h-11 group/btn"
                        >
                          <span>{slide.ctaText || 'Shop Breakfast'}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          to="/honest-report"
                          className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs min-h-10.5 sm:min-h-11 active:scale-95"
                        >
                          <ShieldCheck className="w-4 h-4 text-brand-primary" />
                          <span>View Lab Report</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column Showcase */}
                    <div className="lg:col-span-5 flex justify-center items-center relative py-2 sm:py-4 lg:py-0">
                      <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-amber-200/35 blur-3xl pointer-events-none z-0" />

                      <div className="relative z-10 group/img flex flex-col items-center">
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-xl shadow-amber-950/10 border border-amber-100/60 bg-white/40 backdrop-blur-xs">
                          <ResponsiveImage
                            src={slide.image}
                            alt={slide.productName || slide.title}
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            fetchPriority={idx === 0 ? 'high' : 'auto'}
                            decoding={idx === 0 ? 'sync' : 'async'}
                            width={380}
                            height={340}
                            sizes="(max-width: 640px) 260px, 360px"
                            className="w-56 xs:w-64 sm:w-72 md:w-80 h-48 xs:h-56 sm:h-68 md:h-72 object-cover transition-transform duration-500 hover:scale-103"
                          />
                        </div>

                        <div className="absolute -bottom-2.5 sm:-bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md border border-amber-100 flex items-center gap-1.5 z-20 whitespace-nowrap">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] sm:text-xs font-black text-slate-900">
                            {slide.rating || '4.8'}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                            • {slide.reviewCount || '2,140+'} parents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="hero-swiper-pagination flex justify-center items-center gap-1.5 pt-2" />
        </div>
      </div>
    </section>
  );
}
