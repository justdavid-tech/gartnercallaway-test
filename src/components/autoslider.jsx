import React from "react";
import "../index.css";

const topImages = [
  "/assets/interaction (1).jpeg",
  "/assets/interaction (2).jpeg",
  "/assets/interaction (3).jpeg",
  "/assets/interaction (4).jpeg",
  "/assets/interaction (5).jpeg",
  "/assets/interaction (6).jpeg",
  "/assets/interaction (7).jpeg",
  "/assets/interaction (8).jpeg",
];

const bottomImages = [
  "/assets/production (1).jpeg",
  "/assets/production (2).jpeg",
  "/assets/production (3).jpeg",
  "/assets/production (4).jpeg",
  "/assets/production (5).jpeg",
  "/assets/production (6).jpeg",
  "/assets/production (7).jpeg",
  "/assets/production (8).jpeg",
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