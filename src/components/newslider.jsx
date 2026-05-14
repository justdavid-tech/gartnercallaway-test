import React from "react";
import { urlFor } from "../lib/sanity";
import "../index.css";

export default function AutoSlider({ images }) {
  if (!images || images.length === 0) return null;

  // We repeat the items multiple times to ensure the track is always wider than the screen
  // and the animation has enough content to loop seamlessly.
  const sliderItems = [...images, ...images, ...images, ...images, ...images, ...images];

  return (
    <section className="w-full overflow-hidden py-12 bg-white">
      <div className="relative flex overflow-hidden">
        {/* slider-track-right animation moves from -50% to 0 */}
        <div className="slider-track-right flex gap-6">
          {sliderItems.map((img, index) => (
            <div 
              key={`${img._id}-${index}`} 
              className="relative w-[350px] sm:w-[450px] h-[250px] sm:h-[320px] shrink-0 overflow-hidden rounded-3xl group shadow-lg"
            >
              <img
                src={urlFor(img.image).width(900).url()}
                alt={img.image?.alt || img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* News Headline Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gc-green-400 font-bold mb-2 sm:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  {img.category || "Media Publication"}
                </span>
                <h3 className="text-white text-lg sm:text-xl font-display font-semibold leading-tight line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {img.title}
                </h3>
                <div className="w-12 h-1 bg-gc-green-400 mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
