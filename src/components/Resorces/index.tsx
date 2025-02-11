'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ResourceCard from '../Common/ResourceCard';
import GallerySlider from '../JobDetail/Slider/GallarySlider';

// Define types for categories and resources
interface Category {
    id: number;
    name: string;
}

interface Resource {
    id: number;
    title: string;
    imageUrl: string;
}

// Define categories and resources data
const categories: Category[] = [
    { id: 1, name: 'Our Insights' },
    { id: 2, name: 'Skill Courses' },
    { id: 3, name: 'Success Stories' },
    { id: 4, name: 'Videos' },
    { id: 5, name: 'Podcast' },
    { id: 6, name: 'Events' },
];

const resourcesData: Record<string, Resource[]> = {
    'Our Insights': [
        {
            id: 1,
            title: 'Career Success: Strategies and Support for Women Professionals',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 2,
            title: 'Leadership Skills for Women in Business',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 3,
            title: 'Navigating Workplace Challenges',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 4,
            title: 'Building a Personal Brand',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 5,
            title: 'Effective Networking Strategies',
            imageUrl: '/assets/sliders/resource_1.png'
        },
    ],
    'Skill Courses': [
        {
            id: 6,
            title: 'Web Development Bootcamp',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 7,
            title: 'Data Science Fundamentals',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 8,
            title: 'Digital Marketing Mastery',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 9,
            title: 'Graphic Design Essentials',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 10,
            title: 'Project Management Certification',
            imageUrl: '/assets/sliders/resource_1.png'
        },
    ],
    'Success Stories': [
        {
            id: 11,
            title: 'From Intern to CEO - A Journey of Growth',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 12,
            title: 'How I Landed My Dream Job in Tech',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 13,
            title: 'Overcoming Adversity - A Success Story',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 14,
            title: 'Building a Startup from Scratch',
            imageUrl: '/assets/sliders/resource_1.png'
        },
    ],
    'Videos': [
        {
            id: 15,
            title: 'Top 10 Tips for Career Advancement',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 16,
            title: 'How to Ace Your Next Interview',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 17,
            title: 'The Importance of Mentorship in Your Career',
            imageUrl: '/assets/sliders/resource_1.png'
        },
    ],
    'Podcast': [
        {
            id: 18,
            title: 'Women in Leadership - Breaking Barriers',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 19,
            title: 'The Future of Work - Trends to Watch',
            imageUrl: '/assets/sliders/resource_1.png'
        },
        {
            id: 20,
            title: 'Balancing Work and Life - Tips from Experts',
            imageUrl: '/assets/sliders/resource_1.png'
        },
    ],
    'Events': [
        {
            id: 21,
            title: 'Annual Women in Business Conference 2023',
            imageUrl:'/assets/sliders/resource_1.png'
          },
          {
              id :22,
              title:'Networking Event for Young Professionals ',
              imageUrl:'/assets/sliders/resource_1.png'
          }, 
          {
              id :23,
              title:'Webinar on Personal Finance Management ',
              imageUrl:'/assets/sliders/resource_1.png'
          }
      ]
};

export { categories, resourcesData };

export default function Resources() {
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name);
    
    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName);
    };

    return (
        <div className="container-left flex flex-col lg:flex-row gap-5 xl:gap-10">
            <div className="block lg:w-[30%] lg:max-w-[280px]">
                <ul className="flex lg:flex-col text-[#C8C9CB] overflow-auto font-bold text-lg md:text-xl xl:text-3xl 2xl:text-4xl gap-5 xl:gap-7">
                    {categories.map(category => (
                        <li 
                            key={category.id} 
                            className={`cursor-pointer whitespace-nowrap lg:whitespace-normal ${selectedCategory === category.name ? 'text-[#E41C3B]' : ''}`} 
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full overflow-auto gap-5 md:gap-7 xl:gap-9 2xl:gap-10 mb-5 md:mb-8">
                <div className="">
                    <GallerySlider
                    slides={resourcesData[selectedCategory]}
                    freeMode={true}
                    slideComponent={ResourceCard}
                    autoplayDuration={2000}
                    speed={4000}
                    autoplay={true}
                    spaceBetween={35}
                    slidesPerView={"auto"}
                    />
                </div>
                <div className="flex container justify-end mt-5 sm:mt-10">
                    <div className="block max-w-[380px]">
                        <button className="font-bold text-base xl:text-lg 2xl:text-xl px-4 py-2 xl:px-7 2xl:px-8 xl:py-3 border-none rounded-full text-[#fff] opacity-80">View all Insights</button>
                    </div>
                </div>
            </div>
        </div>
    );
}   