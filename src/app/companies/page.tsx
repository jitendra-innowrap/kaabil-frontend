import React, { Suspense } from 'react'
import Companies from './Companies'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Companies />
      </Suspense>
    </div>
  )
}

export default Page