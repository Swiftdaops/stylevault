'use client';

import Image from 'next/image';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const heroSlides = [
  {
    title: 'Lash Tech',
    tag: 'Luxury client experience',
    description: 'Turn your lash business into a premium booking destination with a polished storefront that highlights your work and drives consistent appointments.',
    image: 'https://res.cloudinary.com/dnitzkowt/image/upload/v1773574325/LASH_MASTER_hvouog.jpg',
  },
  {
    title: 'Nail Tech',
    tag: 'Elevated studio presence',
    description: 'Showcase your signature nail sets, pricing, and availability in a clean, modern interface designed to attract clients and increase bookings.',
    image: 'https://res.cloudinary.com/dnitzkowt/image/upload/v1773545570/First_off_I_would_like_to_extend_my_heartfelt_gratitude_to_each_and_every_individual_who_has_supported_me_throughout_this_journey__My_growth_and_success_would_not_have_been_possible_without_y_ulzdco.jpg',
  },
  {
    title: 'Makeup Artist',
    tag: 'Professional portfolio flow',
    description: 'Present your portfolio, event packages, and booking options in a seamless experience that converts visitors into paying clients.',
    image: 'https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg',
  },
  {
    title: 'Professional Barber Brand',
    tag: 'Clean, premium presence',
    description: 'Turn your barber profile into a high-end booking destination with smooth interactions and a polished, modern look that builds instant trust.',
    image: 'https://res.cloudinary.com/dnitzkowt/image/upload/v1773763980/GX_2_hsukjq.jpg',
  },
  {
    title: 'Hair Stylist',
    tag: 'Polished salon presence',
    description: 'Showcase your signature cuts, color services, and styling expertise in a premium storefront that builds trust and turns visitors into loyal clients.',
    image: 'https://res.cloudinary.com/dnitzkowt/image/upload/v1773574318/q3bs23hkql7gl8q1c4g0.jpg',
  },
];

export default function LuxuryHeroSlider() {
  return (
    <div className="luxury-swiper relative overflow-hidden rounded-4xl border border-white/40 bg-white/10 shadow-[0_30px_120px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 z-20 rounded-4xl border border-white/35" />
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-4xl opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-white/60" />
      <div className="pointer-events-none absolute inset-y-8 left-0 z-20 w-px bg-white/35" />

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1400}
        loop
        autoplay={{
          delay: 3800,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-120 sm:h-140"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={`${slide.title}-${index}`}>
            <div className="relative h-full w-full overflow-hidden rounded-4xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/70" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/75 to-transparent" />

              <div className="absolute inset-x-5 bottom-5 z-30 rounded-[1.75rem] border border-white/20 bg-white/12 p-5 text-white shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/90">
                    {slide.tag}
                  </span>
                  <span className="text-xs uppercase tracking-[0.35em] text-white/65">0{index + 1}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{slide.title}</h3>
                  <p className="max-w-md text-sm leading-6 text-white/78 sm:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
