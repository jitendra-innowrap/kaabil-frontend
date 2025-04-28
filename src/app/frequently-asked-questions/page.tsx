'use client'
import { showToast } from '@/components/utils';
import { getSessionData } from '@/components/utils/deviceId';
import api from '@/Services/Apiservice';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-headless-accordion'
import { BiChevronDown, BiChevronRight, BiChevronUp } from 'react-icons/bi'

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  [key: string]: FAQItem[];
};

const data ={
    "code": 1,
    "result": {
      "Jobseekers": [
        {
          "question": "How can I register on the Kaabil platform?",
          "answer": "You can register through our website or mobile app by providing your basic details and verifying your email/phone number."
        },
        {
          "question": "Is there any registration fee?",
          "answer": "No, registration on Kaabil is completely free for all job seekers."
        },
        {
          "question": "How do I update my profile information?",
          "answer": "Go to your profile section and click on 'Edit' to update any information."
        },
        {
          "question": "What types of jobs are available?",
          "answer": "We list opportunities across various sectors including IT, healthcare, education, and more."
        },
        {
          "question": "How will I know if employers view my profile?",
          "answer": "You'll receive notifications when employers view or shortlist your profile."
        }
      ],
      "Employers_and_Organizations": [
        {
          "question": "How can our company post jobs on Kaabil?",
          "answer": "Register as an employer and use our dashboard to post job listings."
        },
        {
          "question": "What are the pricing plans for employers?",
          "answer": "We offer both free and premium plans with different features."
        },
        {
          "question": "How do we screen candidates?",
          "answer": "Our platform provides tools to filter and shortlist candidates based on your criteria."
        },
        {
          "question": "Can we schedule interviews through Kaabil?",
          "answer": "Yes, our platform includes an interview scheduling feature."
        },
        {
          "question": "How do we verify candidate credentials?",
          "answer": "We offer optional background verification services."
        },
        {
          "question": "What industries do you serve?",
          "answer": "We cater to all major industries including technology, healthcare, finance, and more."
        },
        {
          "question": "Can we post internship opportunities?",
          "answer": "Yes, we support both full-time and internship postings."
        },
        {
          "question": "How do we manage multiple job postings?",
          "answer": "Our dashboard allows bulk management of all your active listings."
        },
        {
          "question": "Is there analytics available?",
          "answer": "Premium accounts get detailed analytics about applicant demographics."
        },
        {
          "question": "How do we contact support?",
          "answer": "Use the help center in your dashboard or email support@kaabil.com."
        }
      ],
      "CSR_and_NGO_Collaboration": []
    }
  }

export default function Faq() {
    const [faqsData, setFaqsData] = useState<FAQCategory | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Jobseekers');
    const [displayCount, setDisplayCount] = useState<number>(7);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [isloading, setIsloading] = useState(true);
    const fetchFAQs = async () => {
        try {
            setIsloading(true)
            const response = await api.get("Auth/getFaqs");
            const responseData = response.data;
            
            if (responseData.code === 1) {
                setFaqsData(responseData.result);
                // Set first FAQ as active by default
                if (responseData.result?.Jobseekers?.length > 0) {
                    setActiveAccordion(responseData.result.Jobseekers[0].question);
                }
            }
        } catch (error: any) {
            if (error?.status == 404) {
                notFound();
            }
            console.log(error);
            showToast(error?.message || "Failed to load FAQs", true);
        } finally{
            setIsloading(false);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setDisplayCount(7);
        // Set first FAQ of new category as active
        if (faqsData && faqsData?.[category]?.length > 0) {
            setActiveAccordion(faqsData[category][0].question);
        } else {
            setActiveAccordion(null);
        }
    };

    const handleViewMore = () => {
        if (faqsData && faqsData[selectedCategory]) {
            setDisplayCount(faqsData[selectedCategory].length);
        }
    };

    const toggleAccordion = (question: string) => {
        setActiveAccordion(activeAccordion === question ? null : question);
    };

    const categories = faqsData ? Object.keys(faqsData) : ['Jobseekers', 'Employers_and_Organizations', 'CSR_and_NGO_Collaboration'];
    const currentFAQs = faqsData?.[selectedCategory] || [];
    const showViewMore = currentFAQs.length > 7 && displayCount < currentFAQs.length;

    return (
        <main className=''>
            <div className="container my-5 xl:my-14 3xl:my-16">
                <section>
                    <h1 className='text-black text-center mx-auto flex flex-wrap justify-center items-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[64px] mb-5 xl:mb-8 3xl:mb-10 font-medium'>
                        Frequently Asked Questions
                    </h1>
                    {
                        isloading?
                        <div className="flex justify-center items-center h-28">
                            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
                        </div>
                        :
                        <>
                            <div className="flex justify-center mb-5 xl:mb-8 3xl:mb-10 gap-2">
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`cursor-pointer hover:scale-95 transition-all duration-100 ${selectedCategory === category ? "bg-black text-white border border-black" : "text-black border border-[#B8B8B8]"} px-3 py-1 xl:px-6 xl:py-2 3xl:px-8 3xl:py-[9px] text-xs 3xl:text-sm rounded-md 3xl:rounded-lg capitalize`}
                                    >
                                        {category.replace(/_/g, ' ')}
                                    </div>
                                ))}
                            </div>
                            
                            {currentFAQs.length === 0 ? (
                                <div className="text-center py-10">No FAQs available for {selectedCategory.replace(/_/g, ' ')}</div>
                            ) : (
                                <>
                                    {currentFAQs.slice(0, displayCount).map((faq, index) => (
                                        <Accordion 
                                            key={index} 
                                            className='relative mb-4' 
                                            transition={{ duration: '300ms', timingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }}
                                        >
                                            <AccordionItem>
                                                {() => (
                                                    <div className={`border ${activeAccordion === faq.question ? "border-red border-[2px]" : ""} bg-white px-7 3xl:px-8 py-5 3xl:py-6 shadow-sm rounded-[20px]`}>
                                                        <AccordionHeader 
                                                            className="w-full px-0 !bg-transparent flex justify-between items-center text-black"
                                                            onClick={() => toggleAccordion(faq.question)}
                                                        >
                                                            <span className="font-semibold text-sm 2xl:text-base">{faq.question}</span>
                                                            {activeAccordion === faq.question ? (
                                                                <BiChevronUp className="hidden text-slate-500 font-bold text-xl" />
                                                            ) : (
                                                                <BiChevronDown className="hidden text-slate-500 font-bold text-xl" />
                                                            )}
                                                        </AccordionHeader>
                                                        {activeAccordion === faq.question && (
                                                            <AccordionBody>
                                                                <div className="max-w-[calc(100%_-50px)] pt-4">
                                                                    {faq.answer}
                                                                </div>
                                                            </AccordionBody>
                                                        )}
                                                        <div 
                                                            className={`rounded-full absolute top-5 3xl:top-6 right-6 size-7 xl:size-10 3xl:size-[50px] grid place-items-center ${activeAccordion === faq.question ? "bg-red text-white" : "bg-transparent border text-black"}`}
                                                            onClick={() => toggleAccordion(faq.question)}
                                                        >
                                                            <svg 
                                                                className={`${activeAccordion !== faq.question ? '-rotate-90' : ''} transition-all duration-300 scale-75 md:scale-90 xl:scale-100`} 
                                                                width="14" 
                                                                height="8" 
                                                                viewBox="0 0 14 8" 
                                                                fill="none" 
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path 
                                                                    d="M1.17716 1.07266L5.97128 5.86678C6.53745 6.43296 7.46392 6.43296 8.0301 5.86678L12.8242 1.07266" 
                                                                    stroke={activeAccordion === faq.question ? "white" : "black"} 
                                                                    strokeWidth="1.5" 
                                                                    strokeMiterlimit="10" 
                                                                    strokeLinecap="round" 
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                    
                                    {showViewMore && (
                                        <div className="text-center mt-6">
                                            <button 
                                                onClick={handleViewMore}
                                                className="bg-red text-white px-6 py-2 rounded-lg hover:bg-red-dark transition-colors"
                                            >
                                                View More
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    }
                </section>
            </div>
        </main>
    );
}