import React, { Suspense } from 'react'
import CompanyTrading from './CompanyTrading'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyTrading />
      </Suspense>
    </div>
  )
}

export default Page