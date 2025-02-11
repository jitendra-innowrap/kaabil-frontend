'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Suspense } from 'react';

function PopularTags() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for the selected tags
    const [tags, setTags] = useState<string[]>([]);

    // Load initial tags from URL if present
    useEffect(() => {
        const tagsFromUrl = searchParams.get('tags');
        if (tagsFromUrl) {
            setTags(tagsFromUrl.split(','));
        }
    }, [searchParams]);

    // Toggle the tag selection and update the URL parameters
    const handleTagClick = (tag: string) => {
        let updatedTags: string[];

        if (tags.includes(tag)) {
            // If tag is already selected, remove it
            updatedTags = tags.filter((t) => t !== tag);
        } else {
            // If tag is not selected, add it
            updatedTags = [...tags, tag];
        }

        // Update the state
        setTags(updatedTags);

        // Update the query parameters in the URL
        const params = new URLSearchParams(searchParams.toString());
        if (updatedTags.length > 0) {
            params.set('tags', updatedTags.join(','));
        } else {
            params.delete('tags');
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Define an array of available tags
    const availableTags = ['Retail', 'Manufacturing', 'IT', 'Healthcare', 'Hospitality', 'Travel'];

    return (
        <Accordion
            className='border bg-white px-7 border-[#A7A7A7] rounded-[20px]'
            transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
        >
            <AccordionItem isActive={true}>
                {({ open }: any) => (
                    <>
                        <AccordionHeader className="w-full flex justify-between items-center text-black py-4">
                            <span className="font-normal text-base">Popular Tags</span>
                            {open ? (
                                <BiChevronUp className="text-slate-500 font-bold text-xl" />
                            ) : (
                                <BiChevronDown className="text-slate-500 font-bold text-xl" />
                            )}
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="block mb-10">
                                <ul className="flex flex-wrap gap-2">
                                    {availableTags.map((tag) => (
                                        <li
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className={`cursor-pointer rounded-[36px] px-4 py-2 border text-sm min-w-fit text-center capitalize ${
                                                tags.includes(tag)
                                                    ? 'border-[#e41c3b] font-medium  text-[#e41c3b]'
                                                    : 'border-black text-black'
                                            }`}
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AccordionBody>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}

// Wrap the component with Suspense in your page or parent component where it's used
export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PopularTags />
        </Suspense>
    );
}