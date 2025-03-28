"use client"

import Image from "next/image"
import { useState } from "react"

export default function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))
  }

  return (
    <div className="w-full font-sans overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px]">
        {/* Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/new-assets/banners/aboutus.png"
            alt="Woman using tablet"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Overlay */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white max-w-xs sm:max-w-sm md:max-w-md p-4 bg-black bg-opacity-40 rounded-lg md:bg-transparent md:right-0 lg:right-0 xl:right-0 mr-4 md:mr-10 lg:mr-40">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg md:bg-transparent md:p-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              <span className="whitespace-nowrap">
                Empowering <span className="font-kalam font-bold">women</span>
              </span>
              <br />
              <span className="whitespace-nowrap">and transforming lives.</span>
            </h1>
            <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg">
              By equipping 1 million women with skills and career opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-medium mb-8 md:mb-12 text-left">
          Our <span className="font-kalam font-extrabold italic text-red">approach</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative">
          {/* Card 01 */}
          <div className="relative bg-rose-300 rounded-2xl p-6 md:p-8 pt-14 md:pt-16 pb-8 md:pb-12 shadow-lg z-10">
            <div className="absolute top-4 md:top-6 left-4 md:left-6 text-2xl md:text-3xl font-extrabold text-white">
              01
            </div>
            <h3 className="text-base md:text-lg font-extrabold mb-3 md:mb-4 text-black leading-tight">
              Empowering Women, Creating Opportunities
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Imagine a world where every woman has the power to shape her future, where talent is nurtured, and
              opportunities are limitless. This vision is what drives kaabilprogram.org — a pioneering initiative
              dedicated to empowering women across India.
            </p>
          </div>

          {/* Card 02 */}
          <div className="relative bg-green-200 rounded-2xl p-6 md:p-8 pt-14 md:pt-16 pb-8 md:pb-12 shadow-lg z-10">
            <div className="absolute top-4 md:top-6 left-4 md:left-6 text-2xl md:text-3xl font-extrabold text-white">
              02
            </div>
            <h3 className="text-base md:text-lg font-extrabold mb-3 md:mb-4 text-black leading-tight">
              Bridging the Gap Between Talent and Opportunity
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Through comprehensive skilling, career development, and job placement programs, we provide
              industry-relevant training and career guidance tailored to women's unique aspirations.
            </p>
          </div>

          {/* Card 03 */}
          <div className="relative bg-orange-200 rounded-2xl p-6 md:p-8 pt-14 md:pt-16 pb-8 md:pb-12 shadow-lg z-10">
            <div className="absolute top-4 md:top-6 left-4 md:left-6 text-2xl md:text-3xl font-extrabold text-white">
              03
            </div>
            <h3 className="text-base md:text-lg font-extrabold mb-3 md:mb-4 text-black leading-tight">
              Driving Impact, Shaping the Future
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              At kaabil, we believe that when women rise, communities thrive. Our mission is to ensure that every woman
              has access to meaningful employment, unlocking her full potential and building a better tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mt-16 md:mt-24 overflow-hidden">
        <Image
          src="/new-assets/banners/aboutus1.png"
          alt="Map of India with glowing network"
          fill
          className="object-cover"
        />
      </div>

      {/* Why Choose Kaabil Section */}
      <section className="bg-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-bold mb-2">
            Why choose <span className="font-kalam font-bold text-red">Kaabil?</span>
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Women registered on our platform gain access to a wide range of services to help them find the right
            resources and guidance to transform their lives and livelihoods.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            {/* Card 1 */}
            <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
              <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src="/new-assets/company-icons/about1.png"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
              <h3 className="font-semibold text-base md:text-lg mt-8 mb-2">21st-century skills</h3>
              <p className="text-xs md:text-sm text-gray-600">Training to prepare women for the future of work.</p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
              <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src="/new-assets/company-icons/about2.png"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
              <h3 className="font-semibold text-base md:text-lg mt-8 mb-2">Career readiness programs</h3>
              <p className="text-xs md:text-sm text-gray-600">
                That offer interview prep, business communication, and job placement support.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
              <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src="/new-assets/company-icons/about3.png"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
              <h3 className="font-semibold text-base md:text-lg mt-8 mb-2">Digital and financial literacy</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Enabling women to navigate the modern world with confidence.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-lg text-center">
              <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-[#D9333F] rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src="/new-assets/company-icons/about4.png"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
              <h3 className="font-semibold text-base md:text-lg mt-8 mb-2">Job opportunities</h3>
              <p className="text-xs md:text-sm text-gray-600">Through our growing network of partner companies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 pb-0">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8">
              How it <span className="font-kalam font-extrabold text-red">works</span>
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-4">
              Kaabilprogram.org connects skilled and job-ready women with companies across various industries. We
              simplify the job search process and offer ongoing career support to ensure a smooth transition into the
              workforce.
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Our platform is designed to create quick and meaningful connections between employers and candidates,
              ensuring the hiring process is efficient and transparent while bringing value to both parties.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 -mb-16 md:mb-0 relative">
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
              <Image
                src="/new-assets/images/aboutus1.png"
                alt="Women in training"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 -translate-y-4">
              <Image
                src="/new-assets/images/aboutus2.png"
                alt="Group workshop"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 ml-8 md:ml-16 translate-y-4">
              <Image
                src="/new-assets/images/aboutus3.png"
                alt="Woman working"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 -translate-y-8 md:-translate-y-16 lg:-translate-y-20">
              <Image
                src="/new-assets/images/aboutus4.png"
                alt="Computer training"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Reach Section */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mt-16 md:mt-24 overflow-hidden">
        <Image
          src="/new-assets/banners/aboutus1.png"
          alt="Map of India with glowing network"
          fill
          className="object-cover"
        />
      </div>

      {/* Powered by Collaboration Section */}
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Powered by <span className="font-kalam font-extrabold text-red">collaboration</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                Kaabilprogram.org thrives on collaboration and shared purpose. With Mahindra & Mahindra's strong
                foundation, we are creating a sustainable impact.
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                We also work closely with various NGOs, community organizations, and corporate partners to expand the
                reach and effectiveness of our programs.
              </p>
              <p className="text-sm md:text-base text-gray-700">
                We believe that empowering women is not just about employment—it's about building a better future for
                families, communities, and the nation. Kaabilprogram.org is a step toward that brighter, more inclusive
                future.
              </p>
            </div>

            <div className="relative h-64 md:h-80 lg:h-96">
              <Image
                src="/new-assets/banners/aboutus2.png"
                alt="Woman smiling with headset"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section - FIXED SECTION */}
      <section className="relative w-full  py-12 md:py-16 lg:py-36 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start gap-8 md:gap-16 relative z-10 w-full">
          {/* Left Section: Title & Text */}
          <div className="w-full md:w-[300px] lg:w-[350px] text-left flex flex-col justify-center relative">
            {/* Large Background Quote Icon */}
            <div className="absolute top-[-80px] md:top-[-120px] right-[-40px] md:right-[-70px] w-[150px] h-[150px] md:w-[220px] md:h-[220px] z-[-1]">
              <Image
                src="/new-assets/company-icons/about5.png"
                alt="Background Quote Icon"
                width={220}
                height={220}
                className="object-contain opacity-50"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black relative">
              Our <span className="font-kalam text-red">impact</span>
            </h2>
            <p className="text-black text-base mt-4 md:mt-6 leading-relaxed">
              Mahindra has established <br /> itself as a lead catalyst and <br />
              <span className="font-semibold">empowered 770K women</span><br />
              through several
              programs.
            </p>

            {/* Carousel Buttons */}
            <div className="flex items-center gap-4 mt-6 md:mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 shadow-md border border-gray-200"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-700 shadow-md"
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>
          </div>

          {/* Right Section: Testimonials */}
          <div className="w-full md:w-[calc(100%-350px)] overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {/* Testimonial Cards - Repeated 3 times for the carousel */}
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg w-full md:w-[350px] lg:w-[400px] flex-shrink-0 p-6"
                >
                  {/* User Details */}
                  <div className="flex items-center mb-5">
                    <div className="relative w-12 h-12 md:w-14 md:h-14">
                      <Image
                        src="/new-assets/company-icons/impact1.png"
                        alt="Shashikala Bandaru"
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg text-black">Shashikala Bandaru</h3>
                      <p className="text-sm text-gray-600">Process Associate, TCS</p>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-sm leading-relaxed text-gray-700">
                    Overcoming adversity, Shashikala rose above her challenges, transforming from a stone grinder to a
                    successful Software Tester at Tata Consultancy Services Ltd. With the support of the Pride School
                    Programme, she turned her dreams into reality, proving that resilience and determination can create
                    a brighter future.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Red Background Block Behind Testimonials */}
        <div className="absolute top-0 right-0 w-[65%] h-full bg-[#D9333F] z-0"></div>
      </section>
    </div>
  )
}

