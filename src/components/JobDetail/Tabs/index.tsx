'use client'
import React, { useState } from 'react'
export default function Tabs() {
    const [activeTab, setActiveTab] = useState(0)
    let tabs=["Job Description","About Company","Benefits","Reviews"]
  return (
    <div>
        <div className="flex overflow-x-auto lg:w-[calc(100vw-663px)] lg:max-w-[calc(1440px-663px)]">
            {
                tabs.map((tab,i)=>(
                <button key={i} onClick={()=>setActiveTab(i)} className={`cursor-pointer whitespace-nowrap text-lg py-2 md:py-4 font-bold ${activeTab==i?"text-[#E41C3B] border-b-[4px] border-[#E41C3B]":"text-[#4D4D4F] border-b-[2px] border-[#4D4D4F]"} md:text-xl 2xl:text-2xl px-3 2xl:px-6`}>
                  {tab}
                </button>
                ))
            }
              </div>
              <div className="block mt-8">
                <strong className="font-bold text-lg mt-8 block">Role & responsibilities</strong>
                <ul className="list-disc ml-6 text-base">
                  <li>Recommend and advise on best practices of picking and packing to improve Cx experience.</li>
                  <li>Advise partner stores on mechanisms/ processes leading to correct picking/ packing/ billing of Cx orders using appropriate tools and dashboards.</li>
                  <li>Guide partners on proper usage of dashboards and other portals to prevent any inaccuracies leading to Cx impact.</li>
                  <li>Assess the quality of Pods on cleanliness, hygiene and DE issues and suggest measures to enhance smooth Ops leading to better Cx experience.</li>
                  <li>Advise partner stores on speed perception and order fulfillment. Recommend best practices of the same to improve Cx.</li>
                  <li>Provide recommendations to partners for continuous improvement on delivering best Cx metrics.</li>
                  <li>Provide recommendations on the training aspects required to deliver/improve Cx metrics.</li>
                  <li>Provide recommendations to the partners regarding the change in demand pattern/ spike in order volumes due to holidays/ peak season and suggest/ propose measures to prevent any Cx impact.</li>
                </ul>
                
                <strong className="font-bold text-lg mt-8 block">Preferred candidate profile</strong>
                <ul className="list-disc ml-6 text-base">
                  <li>Graduate / 3-5 years of retail management experience</li>
                  <li>Must have led 15+ people/ employees at Retail/ Store.</li>
                  <li>Problem solving, data-driven decision-making</li>
                  <li>Adaptability to dynamic situations.</li>
                  <li>Experience from retail/FMCG/ quick commerce Industry.</li>
                </ul>

                <strong className="font-bold text-lg mt-8 block">Perks and benefits</strong>
                <ul className="list-disc ml-6 text-base">
                  <li>
                    Monthly Incentives
                  </li>
                  <li>
                    Medical Benefits
                  </li>
                  
                </ul>

                <strong className="font-bold text-lg mt-6 block">Role & responsibilities:</strong>
                Outline the day-to-day responsibilities for this role.

                <strong className="font-bold text-lg mt-6 block">Preferred candidate profile:</strong>
                Specify required role expertise, previous job experience, or relevant certifications.

                <strong className="font-bold text-lg mt-6 block">Perks and benefits:</strong>
                Mention available facilities and benefits the company is offering with this job.

                <strong className="font-bold text-lg mt-6 block">Role:</strong>
                 Retail Store Manager
                <strong className="font-bold text-lg block">Industry Type:</strong>
                 Retail
                <strong className="font-bold text-lg block">Department:</strong>
                 Merchandising, Retail & eCommerce
                <strong className="font-bold text-lg block">Employment Type:</strong>
                 Full Time, Permanent
                <strong className="font-bold text-lg block">Role Category:</strong>
                 Retail Store Operations
                Education
                <strong className="font-bold text-lg block">UG:</strong>
                 Any Graduate
                Key Skills
                Skills highlighted with ‘‘ are preferred keyskills
              </div>
    </div>
  )
}
