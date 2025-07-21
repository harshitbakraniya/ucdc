"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  isActive: boolean;
}

export default function BannerSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banners");
      const data = await res.json();
      setBanners(data.filter((banner: Banner) => banner.isActive));
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-transform duration-500 ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Image
            src={banner.image || "/placeholder.svg"}
            alt={banner.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {banner.title}
              </h1>
              <p className="text-lg md:text-xl mb-8">{banner.description}</p>
              {banner.link && (
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Learn More
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/20 text-white hover:bg-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/20 text-white hover:bg-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </section>
  );
}
