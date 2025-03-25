import MyJobs from '@/components/MyJobs'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <main>
        <Suspense fallback={<div>Loading...</div>}>
            <MyJobs/>
        </Suspense>
    </main>
  )
}
