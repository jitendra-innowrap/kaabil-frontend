import JobsNearYou from '@/components/JobsNearYou'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={
        <div className="flex justify-center items-center h-[200px]">
            <div className="flex animate-spin h-7 w-7 rounded-full border-l-0 border-b-0 border-red border-[3px]"></div>
        </div>
    }>
        <JobsNearYou/>
    </Suspense>
  )
}
