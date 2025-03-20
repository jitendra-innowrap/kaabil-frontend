"use client"

import Image from "next/image"
import { useState } from "react"

export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 1 ? 0 : prev + 1))
  }

  function handlePrevSlide(): void {
    setActiveSlide((prev) => (prev === 0 ? 1 : prev - 1));
  }

  return (
    <div className="w-full font-sans">
      {/* Hero Section with Red Background */}
      <div className="relative w-full h-[550px]">
  {/* Background Red Shape */}
  <div className="absolute top-0 right-0 w-3/4 h-full bg-[#A12727] -z-10"></div>

  {/* Image */}
  <div className="relative w-full h-full overflow-hidden">
    <Image
      src="/new-assets/banners/aboutus.png"
      alt="Woman using tablet"
      fill
      className="object-cover"
    />
  </div>

  {/* Text Overlay in the Red Area */}
  <div className="absolute top-1/2 right-16 transform -translate-y-1/2 text-white max-w-md">
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Empowering <span className="italic">women</span>
      <br />
      and transforming lives.
    </h1>
    <p className="mt-4 text-lg">
      By equipping 1 million women with skills and career opportunities.
    </p>
  </div>
</div>


      {/* Our Approach Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-medium mb-8 text-left">
          Our <span className="font-kalam font-bold text-red text-3xl">approach</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 01 */}
          <div className="relative bg-rose-300 rounded-3xl p-8 pt-20 pb-12 shadow-lg">
            <div className="absolute top-6 left-6 text-4xl font-bold text-white">01</div>
            <h3 className="text-xl font-bold mb-4 text-black">Empowering Women, Creating Opportunities</h3>
            <p className="text-sm text-gray-700">
              Imagine a world where every woman has the power to shape her future, where talent is nurtured, and
              opportunities are limitless. This vision is what drives Kooliprogram.org — a pioneering initiative dedicated to
              empowering women across India.
            </p>
          </div>

          {/* Card 02 */}
          <div className="relative bg-green-200 rounded-3xl p-8 pt-20 pb-12 shadow-lg">
            <div className="absolute top-6 left-6 text-4xl font-bold text-white">02</div>
            <h3 className="text-xl font-bold mb-4 text-black">Bridging the Gap Between Talent and Opportunity</h3>
            <p className="text-sm text-gray-700">
              Through comprehensive skilling, career development, and job placement programs, we provide
              industry-relevant training and career guidance tailored to women’s unique aspirations.
            </p>
          </div>

          {/* Card 03 */}
          <div className="relative bg-orange-200 rounded-3xl p-8 pt-20 pb-12 shadow-lg">
            <div className="absolute top-6 left-6 text-4xl font-bold text-white">03</div>
            <h3 className="text-xl font-bold mb-4 text-black">Driving Impact, Shaping the Future</h3>
            <p className="text-sm text-gray-700">
              At Kooli, we believe that when women rise, communities thrive. Our mission is to ensure that every woman
              has access to meaningful employment, unlocking her full potential and building a better tomorrow.
            </p>
          </div>
        </div>

        {/* Decorative dotted lines */}
        <div className="relative mt-12 hidden md:block">
          <svg className="absolute -top-20 left-1/4" width="200" height="100" viewBox="0 0 200 100" fill="none">
            <path d="M0,50 C50,0 150,100 200,50" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          </svg>
          <svg className="absolute -top-10 right-1/4" width="200" height="100" viewBox="0 0 200 100" fill="none">
            <path d="M0,50 C50,100 150,0 200,50" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" fill="none" />
          </svg>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative w-full h-96 bg-gray-100 my-8">
        <Image src="/placeholder.svg?height=400&width=1200" alt="Women in a workshop" fill className="object-cover" />
        <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 cursor-pointer" onClick={nextSlide}>
          <svg
            xmlns="https://www.figma.com/design/7RouMxeFN4hHo3YT4XoRDy/Kaabil-website-design_NEW_v2?node-id=1178-4140&t=0cKa4WQ5pLOvlRmT-4"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Why Choose Kaabil Section */}

<section className="w-full max-w-7xl mx-auto px-6 py-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Card 1 */}
    <div className="relative bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-14 h-14 flex items-center justify-center">
    {/* Plus Circle Icon */}
      </div>
      <h3 className="font-semibold text-lg mt-8">21st-century skills</h3>
      <p className="text-sm text-gray-600">Training to prepare women for the future of work.</p>
    </div>

    {/* Card 2 */}
    <div className="relative bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-14 h-14 flex items-center justify-center">
 {/* Clipboard Icon */}
      </div>
      <h3 className="font-semibold text-lg mt-8">Career readiness programs</h3>
      <p className="text-sm text-gray-600">That offer interview prep, business communication, and job placement support.</p>
    </div>

    {/* Card 3 */}
    <div className="relative bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-14 h-14 flex items-center justify-center">
{/* Briefcase Icon */}
      </div>
      <h3 className="font-semibold text-lg mt-8">Digital and financial literacy</h3>
      <p className="text-sm text-gray-600">Enabling women to navigate the modern world with confidence.</p>
    </div>

    {/* Card 4 */}
    <div className="relative bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-14 h-14 flex items-center justify-center">
{/* User Circle Icon */}
      </div>
      <h3 className="font-semibold text-lg mt-8">Job opportunities</h3>
      <p className="text-sm text-gray-600">Through our growing network of partner companies.</p>
    </div>

  </div>
</section>


      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">
          How it <span className="font-kalam font-bold text-red text-3xl">works</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-700 mb-6">
              Kaabilprogram.org connects skilled and job-ready women with companies across various industries. We
              simplify the job search process and offer ongoing career support to ensure a smooth transition into the
              workforce.
            </p>
            <p className="text-gray-700 mb-6">
              Our platform is designed to create quick and meaningful connections between employers and candidates,
              ensuring the hiring process is efficient and transparent while bringing value to both parties.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/new-assets/images/aboutus1.png"
              alt="Women in training"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/new-assets/images/aboutus2.png"
              alt="Group workshop"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/new-assets/images/aboutus3.png"
              alt="Woman working"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="/new-assets/images/aboutus4.png"
              alt="Computer training"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Reach Section */}
      <div className="relative h-64 mb-12">
        <Image
          src="/new-assets/banners/aboutus1.png"
          alt="Map of India with glowing network"
          fill
          className="object-contain"
        />
      </div>

      {/* Powered by Collaboration Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Powered by <span className="font-kalam font-bold text-red text-3xl">collaboration</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 mb-6">
              Kaabilprogram.org thrives on collaboration and shared purpose. With Mahindra & Mahindra's strong
              foundation, we are creating a sustainable impact.
            </p>
            <p className="text-gray-700 mb-6">
              We also work closely with various NGOs, community organizations, and corporate partners to expand the
              reach and effectiveness of our programs.
            </p>
            <p className="text-gray-700">
              We believe that empowering women is not just about employment—it's about building a better future for
              families, communities, and the nation. Kaabilprogram.org is a step toward that brighter, more inclusive
              future.
            </p>
          </div>

          <div>
            <Image
              src="/new-assets/banners/aboutus2.png"
              alt="Woman smiling with headset"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <section className="relative w-full py-20 bg-[#f8f6f6] overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start gap-16 relative z-10">
    
    {/* Left Section: Title & Text */}
    <div className="md:w-1/3 text-left flex flex-col justify-center relative">
      {/* Large Quote Mark (Behind Text) */}
      <span className="absolute top-[-20px] left-0 text-[180px] text-white font-bold opacity-20 leading-none">
        “
      </span>

      <h2 className="text-5xl font-bold text-black relative">
        Our <span className="italic text-red">impact</span>
      </h2>
      <p className="text-black text-lg mt-6 leading-relaxed">
        Mahindra has established itself as a lead catalyst and 
        <span className="font-semibold"> empowered 770K women</span> through several programs.
      </p>

      {/* Carousel Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 shadow-md">
          ❮
        </button>
        <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-200 shadow-md">
          ❯
        </button>
      </div>
    </div>

    {/* Right Section: Testimonials */}
    <div className="md:w-2/3 flex gap-6 overflow-x-auto snap-x scrollbar-hide">
      {/* Testimonial Cards */}
      {[1, 2].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl p-8 shadow-xl w-[420px] flex-shrink-0 snap-center"
        >
          {/* User Details */}
          <div className="flex items-center mb-5">
            <img
              src="/new-assets/z.jpg"
              alt="Shashikala Bandaru"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="ml-5">
              <h3 className="font-bold text-lg text-black">
                Shashikala Bandaru
              </h3>
              <p className="text-sm text-gray-600">Process Associate, TCS</p>
            </div>
          </div>

          {/* Testimonial Content */}
          <p className="text-[15px] leading-[1.7] text-gray-700">
            Overcoming adversity, Shashikala rose above her challenges, 
            transforming from a stone grinder to a successful Software Tester 
            at Tata Consultancy Services Ltd. With the support of the Pride 
            School Programme, she turned her dreams into reality, proving that 
            resilience and determination can create a brighter future.
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Red Background Block Behind Testimonials */}
  <div className="absolute top-0 right-0 w-3/5 h-full bg-[#D9333F] z-0"></div>
</section>

    </div>
  );
}