import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { useFeaturedEvent } from "../hooks/useFeaturedEvent";



interface HeroSectionProps {
  currentPage: number;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { data : featuredEvent} = useFeaturedEvent();

  if (!featuredEvent) return null;


  return (
    <section className="relative h-[100vh] mb-16 rounded-b-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black ">
        <img
          src={featuredEvent.image}
          alt={featuredEvent.title}
          className="w-full h-full object-cover opacity-70 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full mb-4">
            Featured Event
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {featuredEvent.title}
          </h1>

          <p className="text-gray-200 text-lg mb-6 line-clamp-3">
            {featuredEvent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center text-white">
              <Calendar size={20} className="mr-2 text-pink-400" />
              <span>{featuredEvent.startDate}</span>
            </div>

            <div className="flex items-center text-white">
              <MapPin size={20} className="mr-2 text-pink-400" />
              <span>{featuredEvent.venue}</span>
            </div>
          </div>


          <button
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-md hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => {
              document
                .querySelector(".all-events")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Events
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
