"use client";

import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

const carouselImages = [
  "/images/image-1.jpg",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg",
];

export default function CarouselSection() {
  return (
    <section className="w-full h-auto">
      {/* Top background bar */}
      <div className="bg-[#0D0C1E] text-white text-5xl text-center py-8 px-4">
OUR VALUED CUSTOMERS
</div>
      <div className="w-full h-[80px] lg:h-[180px] xl:h-[260px] 2xl:h-[360px] bg-[#0D0C1E] relative">
        {/* Centered floating carousel box with same dimensions as original video frame */}
        
        <div className="w-[320px] md:w-[420px] lg:w-[620px] xl:w-[820px] 2xl:w-[1010px] absolute rounded-2xl overflow-hidden top-0 md:-top-12 lg:top-0 right-1/2 translate-x-1/2">
          <Carousel
            autoplay
            autoplaySpeed={3000}
            dots
            className="w-full h-full"
          >
            {carouselImages.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-[180px] md:h-[240px] lg:h-[320px] xl:h-[420px]"
              >
                <Image
                  src={src}
                  alt={`Carousel Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Bottom background bar (same as original) */}
      <div className="w-full h-[80px] md:h-[120px] lg:h-[180px] xl:h-[260px] 2xl:h-[360px] bg-[#F4F7FC]" />
    </section>
  );
}
