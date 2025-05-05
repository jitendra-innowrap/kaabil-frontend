import Homepage from '@/components/Home/HomePage'

export default async function Page() {
  // Fetch data on the server
  const response = await fetch(`https://meuat.kaam.com/App/V3/Home/homeData`, {
    next: { revalidate: 3600 } // Optional: Revalidate every hour
  })
  const homeData = await response.json()
  // return <pre>{JSON.stringify(homeData, null, 2)}</pre>
  return <Homepage data={homeData.result} />
}