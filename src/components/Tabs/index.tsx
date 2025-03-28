'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface TabsProps {
  tabTitles: string[];
}

export default function Tabs({ tabTitles }: TabsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeHash, setActiveHash] = useState<string>(window.location.hash);

  // Convert tab titles to slugs
  const toSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Update slider position and width
  const updateSlider = () => {
    const hash = window.location.hash;
    const tabs = document.querySelectorAll('.details-tab-item');
    const slider = sliderRef.current;

    if (!slider) return;

    let activeTab = document.querySelector(`.details-tab-item a[href="${hash}"]`);

    // If no hash or invalid hash, default to the first tab
    if (!activeTab && tabs.length > 0) {
      activeTab = tabs[0].querySelector('a');
    }

    if (activeTab) {
      const tabWidth = activeTab.getBoundingClientRect().width;
      const tabOffset = activeTab.getBoundingClientRect().left - activeTab.parentElement!.parentElement!.getBoundingClientRect().left;

      slider.style.width = `${tabWidth}px`;
      slider.style.left = `${tabOffset}px`;
    }
  };

  // Add this helper function to calculate total sticky header height
const getStickyHeadersHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const stickyElements = document.querySelectorAll('*[class*="sticky"]');
  let totalHeight = 0;

  stickyElements.forEach(el => {
    // Only count elements that are actually sticking (visible in viewport)
    const rect = el.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      totalHeight += rect.height;
    }
  });

  return totalHeight;
};

// Then modify your handleTabClick function:
const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
  e.preventDefault();
  
  // Update hash and UI state
  window.location.hash = slug;
  setActiveHash(slug);
  updateSlider();

  // Scroll to section with offset
  setTimeout(() => {
    const targetId = slug.substring(1); // Remove #
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const stickyOffset = getStickyHeadersHeight() + 20; // 20px extra margin
      const targetPosition = targetElement.offsetTop - stickyOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, 10); // Small timeout ensures DOM is updated
};

  // Initialize slider and event listeners
  useEffect(() => {
    updateSlider(); // Set initial slider position

    const handleHashChange = () => {
      setActiveHash(window.location.hash); // Update active hash state on hash change
      updateSlider();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', updateSlider);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', updateSlider);
    };
  }, []);

  return (
    <ul className="details-tabs flex mb-3 md:mb-4 2xl:mb-6 gap-5 md:gap-8 xl:gap-10 2xl:gap-12 border-b py-2 2xl:py-[10px] border-[#D4D4D4] relative">
      {tabTitles.map((title, index) => {
        const slug = `#${toSlug(title)}`;
        const isActive = activeHash === slug || (index === 0 && !activeHash);

        return (
          <li
            key={slug}
            className={`details-tab-item md:text-sm ${isActive ? 'font-bold text-red' : 'font-normal text-black hover:text-red'}`}
          >
            <Link
              href={slug}
              onClick={(e) => handleTabClick(e, slug)}
              className={isActive ? 'text-red' : 'text-black hover:text-red'}
            >
              {title}
            </Link>
          </li>
        );
      })}
      <div
        id="detail-tab-slider"
        ref={sliderRef}
        className="absolute bottom-0 h-1 bg-red transition-all duration-300"
      />
    </ul>
  );
}