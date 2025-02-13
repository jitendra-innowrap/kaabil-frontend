import React from 'react';

interface CardProp {
  name: string;
  color?: string; // Optional color prop with default value
}

export default function IndustryCard({ name, color = "#F8C8C8" }: CardProp) {
  return (
    <div
      className={`w-fit font-normal text-base whitespace-nowrap md:text-lg xl:text-xl px-4 py-2 md:px-6 md:py-3 rounded-full`}
      style={{ backgroundColor: `#${color}` }} // Use inline style for dynamic color
    >
      {name}
    </div>
  );
}
