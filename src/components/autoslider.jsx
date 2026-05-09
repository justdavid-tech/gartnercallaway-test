import React from "react";
import "../index.css";

const topImages = [
  "/assets/farm (1).jpg",
  "/assets/farm (2).jpg",
  "/assets/farm (3).jpg",
  "/assets/farm (4).jpg",
];

const bottomImages = [
  "/assets/farm (5).jpg",
  "/assets/farm (6).jpg",
  "/assets/farm (7).jpg",
  "/assets/farm (8).jpg",
];

export default function AutoSlider() {
  return (
    <section className="w-full overflow-hidden py-10 space-y-6 bg-white">
      
      {/* TOP SLIDER */}
      <div className="relative flex overflow-hidden">
        <div className="slider-track-left flex gap-6">
          {[...topImages, ...topImages].map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="w-[320px] h-[220px] object-cover rounded-3xl shrink-0"
            />
          ))}
        </div>
      </div>

      {/* BOTTOM SLIDER */}
      <div className="relative flex overflow-hidden">
        <div className="slider-track-right flex gap-6">
          {[...bottomImages, ...bottomImages].map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="w-[320px] h-[220px] object-cover rounded-3xl shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}