import Homepage from '@/components/Home/HomePage'
import HomepageStatic from '@/components/Home/HomeStatic'

export default async function Page() {
  // Fetch data on the server
  const response = await fetch(`https://meuat.kaam.com/App/V3/Home/homeData`, {
    next: { revalidate: 3600 } // Optional: Revalidate every hour
  })
  const homeData = await response.json()
  // return <pre>{JSON.stringify(homeData, null, 2)}</pre>
  return <HomepageStatic data={homeData.result} />
}