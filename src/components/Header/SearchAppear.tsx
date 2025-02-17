'use client';
import React, { useEffect, useRef, useState } from 'react';
import SearchSection from '../SearchSection';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { closeSearch } from '@/redux/searchSlice';

export default function SearchAppear() {
    const isSearch = useAppSelector((state) => state.search.value);
    const dispatch = useAppDispatch();
    const searchRef = useRef<HTMLDivElement>(null); // Ref for the search bar container
    const [isClosing, setIsClosing] = useState(false); // Track if the search bar is being closed

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                // Clicked outside the search bar, so close it
                dispatch(closeSearch());
                setIsClosing(true);

            }
        };

        // Add event listener when the search bar is open
        if (isSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearch, dispatch]);

    return (
        <div
            ref={searchRef}
            className={`search-appear-animate ${isSearch ? 'open' : isClosing ? 'closed' : ''}`}
            onAnimationEnd={() => {
                if (isClosing) {
                setIsClosing(false); // Reset closing state after animation ends
                }
            }}
            >            <div className="container search-section px-5 py-4 md:px-14 md:py-6 xl:px-24 2xl:px-20">
                <SearchSection />
            </div>
        </div>
    );
}