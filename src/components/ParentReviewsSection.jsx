import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './common/TestimonialCard';
import { TESTIMONIALS } from '../data/testimonials';

// Swiper Core & Module Styles (Ensure these are imported)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ParentReviewsSection({
  eyebrow = "Happy Kids, Honest Reviews",
  title = "Hear from Real Parents",
  subtitle = "Over 200,000+ mothers and fathers trust Little Joys for their child's daily nutrition.",
  testimonials = TESTIMONIALS,
  bgClass = "",
  sectionClass = "py-8 md:py-12 px-4 md:px-6"
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={`${bgClass} ${sectionClass} overflow-hidden`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF2F92] bg-pink-50 px-3 py-1 rounded-full border border-pink-100 inline-block">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <button
              ref={prevRef}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-[#13805B] hover:text-white hover:border-[#13805B] active:scale-95 transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-[#13805B] hover:text-white hover:border-[#13805B] active:scale-95 transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            direction="horizontal"
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            loop={true}
            grabCursor={true}
            className="testimonials-swiper overflow-hidden !pb-14 w-full"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={t.id || idx} className="!h-auto !flex">
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}