"use client"
import GallerySlider from "@/components/JobDetail/Slider/GallarySlider"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import AnimatedNumber from "@/components/utils/AnimationNumber";
import api from "@/Services/Apiservice";
import { getSessionData } from "@/components/utils/deviceId";
import { notFound } from "next/navigation";
import { showToast } from "@/components/utils";
import TestimonialCardLoader from "@/components/Cards/TestimonialCardLoader";

const slideVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const leftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const rightVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3, // stagger based on index
      duration: 1,
      ease: 'easeOut',
    },
  }),
}

const cardVariantsTwo = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 50,
    scale: 0.95,
    rotate: i % 2 === 0 ? -4 : 4,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonialsList, setTestimonials] = useState<SuccessCard[]>([]);
  const fetchTestimonials = async () => {
          try {
              setIsLoading(true);
              
              let payload = {
                  page: "",
              };
              
              const { deviceId, secret, salt } = getSessionData();
              if (!deviceId || !secret || !salt) {
                  setTimeout(() => fetchTestimonials(), 1000);
                  return;
              }
  
              const formData = new FormData();
              Object.entries(payload).forEach(([key, value]) => {
                  formData.append(key, value as string);
              });
  
              const response = await api.get("Auth/aboutUsTestimonials");
  
              const responseData = response.data as any;
              if (responseData.code === 1) {
                  setTestimonials(responseData?.result?.testimonials as SuccessCard[])
              }
          } catch (error: any) {
              if (error?.status == 404) {
                  notFound();
              }
              // console.log(error);
              showToast(error?.message || "Failed to load testimonials", true);
          } finally {
              setIsLoading(false);
          }
      };
  
      useEffect(() => {
          fetchTestimonials();
      }, []);
  
  const TextimonialCard=({cover_photo, description, designation_company,id, name,user_photo}:SuccessCard)=> {
    return (
        <motion.div
            variants={slideVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.6 }}
      className="bg-white impact-testimonial xl:min-w-[356px] rounded-2xl xl:rounde-[20px] 3xl:rounded-3xl p-4 md:p-5 xl:p-7 3xl:p-10"
    >
      {/* User Details */}
      <div className="flex flex-col md:flex-row md:items-center mb-3 md:mb-4 xl:mb-5 3xl:mb-6">
        <div className="">
          <Image
            src={user_photo}
            alt={name}
            width={80}
            height={80}
            className="rounded-full object-cover size-20 xl:size-16 3xl:size-20"
          />
        </div>
        <div className="md:ml-4 mt-[10px] md:mt-0">
          <h3 className="font-semibold xl:text-lg 3xl:text-xl text-black truncate">{name}</h3>
          <p className="text-sm xl:text-base text-gray-600 truncate">{designation_company}</p>
        </div>
      </div>

      {/* Testimonial Content */}
      <p className="impact-desc text-sm xl:text-base leading-relaxed text-gray-700 md:line-clamp-6">
        {description}
      </p>
        </motion.div>
    )
  }
  
  const testimonials =  isLoading
  ? Array.from({ length: 5 }).map((_, i) => (
      <div key={`loader-${i}`}>
        <TestimonialCardLoader />
      </div>
    )):
    testimonialsList?.map((testimonial, index) => (
      <TextimonialCard key={`${testimonial.id}-${index}`} {...testimonial} />
  ));
  return (
    <main className={"max-w-[100vw] overflow-x-hidden"}>
      {/* Hero Section */}
      <section>
          <Image src='/new-assets/images/about/hero-banner-update.webp' quality={80} alt="" width={3840} height={1000} draggable={false}
          className="hidden sm:inline-block w-full h-auto home-banner"
          />
          <Image src='/new-assets/images/about/hero-banner-mobile-update.webp' quality={80} alt="" width={3840} height={1000} draggable={false}
          className="inline-block sm:hidden !w-full !h-auto home-banner"
          />
      </section>

      {/* Our Approach Section */}
      <section className="bg-white">
        <div className="container py-8 md:py-10 xl:py-12 2xl:py-14 3xl:py-[72px]">
          {/* Section Heading */}
          <h2 className='text-black text-start text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-4 md:mb-6 xl:mb-7 3xl:mb-8 font-medium'>Our <span className="font-kalam font-bold text-red"> approach</span></h2>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 xl:gap-5 2xl:gap-7 3xl:gap-8 relative">
            {/* Card 01 */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants} className="relative bg-[#F4A3AF] rounded-[14px] md:rounded-2xl 3xl:rounded-[20px] p-6 2xl:p-7 3xl:p-8">
              <Image src={'/new-assets/images/about/elements/aeroplane-line-left.svg'} alt="element" width={900} height={500} className="aeroplane-element-line" />
              <div className="text-white text-[50px] 2xl:leading-[60px] 2xl:text-[60px] 3xl:text-[70px] font-medium mb-4 md:mb-4 2xl:mb-8 3xl:mb-9">
                01
              </div>
              <h3 className="text-[18px] leading-[26px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[28px] 3xl:text-[28px] 3xl:leading-[44px] font-medium mb-4 2xl:mb-5 3xl:mb-6">
                Empowering Women, Creating Opportunities
              </h3>
              <p className="text-[#4D4D4F] text-sm xl:text-[13px] 2xl:text-base 3xl:text-lg">
              Imagine a world where every woman has the power to shape her future, where talent is nurtured, and opportunities are limitless. This vision is what drives <span className="text-black font-medium">Kaabilprogram.org</span>—a pioneering initiative dedicated to empowering women across India.
              </p>
            </motion.div>
            {/* Card 02 */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={cardVariants} className="relative bg-[#BAE8D3] rounded-[14px] md:rounded-2xl 3xl:rounded-[20px] p-6 2xl:p-7 3xl:p-8">
              <div className="text-white text-[50px] 2xl:leading-[60px] 2xl:text-[60px] 3xl:text-[70px] font-medium mb-4 md:mb-4 2xl:mb-8 3xl:mb-9">
                02
              </div>
              <h3 className="text-[18px] leading-[26px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[28px] 3xl:text-[28px] 3xl:leading-[44px] font-medium mb-4 xl:mb-5 3xl:mb-6">
                Bridging the Gap Between Talent and Opportunity
              </h3>
              <p className="text-[#4D4D4F] text-sm xl:text-[13px] 2xl:text-base 3xl:text-lg">
              Through comprehensive skilling, career development, and job placement programs, we provide <span className="text-black font-medium">industry-relevant training and career guidance</span> tailored to women's unique aspirations.
              </p>
            </motion.div>
            {/* Card 03 */}
            <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={cardVariants} className="relative bg-[#FDEAC9] rounded-[14px] md:rounded-2xl 3xl:rounded-[20px] p-6 xl:p-7 3xl:p-8">
              <Image src={'/new-assets/images/about/elements/aeroplane-right.svg'} alt="element" width={900} height={500} className="aeroplane-element" />
              <div className="text-white text-[50px] 2xl:leading-[60px] 2xl:text-[60px] 3xl:text-[70px] font-medium mb-4 md:mb-4 2xl:mb-8 3xl:mb-9">
                03
              </div>
              <h3 className="text-[18px] leading-[26px] xl:text-[20px] 2xl:text-[24px] 2xl:leading-[28px] 3xl:text-[28px] 3xl:leading-[44px] font-medium mb-4 2xl:mb-5 3xl:mb-6">
                Driving Impact, Shaping the Future
              </h3>
              <p className="text-[#4D4D4F] text-sm xl:text-[13px] 2xl:text-base 3xl:text-lg">
              At Kaabil, we believe that when women rise, communities thrive. Our mission is to ensure that every woman has access to meaningful  <span className="text-black font-medium">employment</span>, unlocking her full potential and building a better tomorrow.
              </p>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Why Choose Kaabil Section */}
      <section className="bg-[#f6f7f7] py-8 md:py-10 xl:py-12 2xl:py-14 3xl:py-[72px]">
        <div className="container">
        <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-2 font-medium'>Why choose <span className="font-kalam font-bold text-red"> Kaabil?</span></h2>
        <p className="text-center text-sm md:text-base 3xl:text-lg space-x-2 xl:max-w-[770px] 3xl:max-w-[950px] m-auto mb-16 2xl:mb-16 3xl:mb-[82px]">
          Women represent an untapped force in India’s workforce. Many of them lack access to the right resources or platforms to showcase their potential. Kaabil exists to change that. We provide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-12 xl:gap-4 3xl:gap-[22px]">
            {/* Card 1 */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                }} className="about-usp-card relative bg-white rounded-[20px] px-[38px] py-[64px] xl:px-[30px] 2xl:px-[38px] 3xl:px-[44px] 3xl:py-[106px]">
              <div className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/new-assets/icons/about/usp-1.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="size-20 xl:size-16 3xl:size-20 mx-auto"
                />
              </div>
              <h3 className="text-[#231F20] text-sm md:text-base 3xl:text-xl text-center"><span className="font-semibold">21st-century skills training</span> to prepare women for the future of work.</h3>
            </motion.div>
            {/* Card 2 */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                }} className="about-usp-card relative bg-white rounded-[20px] px-[38px] py-[64px] xl:px-[30px] 2xl:px-[38px] 3xl:px-[44px] 3xl:py-[106px]">
              <div className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/new-assets/icons/about/usp-2.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="size-20 xl:size-16 3xl:size-20 mx-auto"
                />
              </div>
              <h3 className="text-[#231F20] text-sm md:text-base 3xl:text-xl text-center"><span className="font-semibold">Career readiness programs</span> that offer interview prep, business communication, and job placement support.</h3>
            </motion.div>
            {/* Card 3 */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                }} className="about-usp-card relative bg-white rounded-[20px] px-[38px] py-[64px] xl:px-[30px] 2xl:px-[38px] 3xl:px-[44px] 3xl:py-[106px]">
              <div className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/new-assets/icons/about/usp-3.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="size-20 xl:size-16 3xl:size-20 mx-auto"
                />
              </div>
              <h3 className="text-[#231F20] text-sm md:text-base 3xl:text-xl text-center"><span className="font-semibold">Digital and financial literacy</span> , enabling women to navigate the modern world with confidence.</h3>
            </motion.div>
            {/* Card 4 */}
            <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                }} className="about-usp-card relative bg-white rounded-[20px] px-[38px] py-[64px] xl:px-[30px] 2xl:px-[38px] 3xl:px-[44px] 3xl:py-[106px]">
              <div className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/new-assets/icons/about/usp-4.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="size-20 xl:size-16 3xl:size-20 mx-auto"
                />
              </div>
              <h3 className="text-[#231F20] text-sm md:text-base 3xl:text-xl text-center"><span className="font-semibold">Job opportunities 
              through </span> our growing network of partner companies</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white">
        <div className="container py-8 md:py-10 xl:py-12 2xl:py-14 3xl:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
                variants={leftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} className="flex flex-col items-start justify-center">
              <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-4 md:mb-6 xl:mb-7 3xl:mb-8 font-medium'>How It <span className="font-kalam font-bold text-red"> works</span></h2>
              <div className="md:hidden mb-6 w-full">
                <Image
                  src="/new-assets/images/about/how-it-works.png"
                  alt="Women in training"
                  width={1200}
                  height={1200}
                  className="rounded-lg md:max-w-[624px] w-full"
                />
              </div>
              <p className="text-sm md:text-base 3xl:text-lg 3xl:leading-[30px] md:max-w-[518px]">
              Kaabilprogram.org connects skilled and job-ready women with companies across various industries. We simplify the job search process and offer ongoing career support to ensure a smooth transition into the workforce. <br />
              Our platform is designed to foster quick connections between employers and candidates, ensuring the hiring process is efficient and transparent.
              </p>
            </motion.div>

            <motion.div
              variants={rightVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} className="hidden md:block">
                <Image
                  src="/new-assets/images/about/how-it-works.png"
                  alt="Women in training"
                  width={1200}
                  height={1200}
                  className="rounded-lg max-w-[624px] w-full"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Reach Section */}
      <div className="bg-[#051525] relative overflow-hidden">
        <div className="flex lg:justify-end gap-8 md:gap-12 container py-8 md:py-10 xl:py-12 2xl:py-14 3xl:py-[82px]">
                <Image
                  src="/new-assets/images/about/reach-map-mobile.webp"
                  alt="Women in training"
                  width={1200}
                  height={1200}
                  className=" lg:hidden rounded-lg z-[1] xl:w-[100%] absolute top-0 left-0  w-full"
                />
                <Image
                  src="/new-assets/images/about/reach-map.webp"
                  alt="Women in training"
                  width={1200}
                  height={1200}
                  className="hidden lg:block rounded-lg z-[1] xl:w-[100%] absolute top-0 left-0  w-full"
                />
            <div className="flex flex-col items-start justify-center relative z-[2] mt-[calc(35vw)] lg:mt-0">
              <motion.h2 variants={leftVariant}
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.4 }} className='text-white text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-4 md:mb-5 xl:mb-4 2xl:mb-7 3xl:mb-8 font-medium'>Our <span className="font-kalam font-bold"> reach</span></motion.h2>
              <motion.p variants={leftVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }} className="text-white font-normal text-sm md:text-base xl:text-sm 3xl:text-lg 3xl:leading-[30px] lg:max-w-[518px] mb-4 md:mb-6 xl:mb-14 3xl:mb-[72px]">
              Kaabil is enabling women across India to build brighter futures by connecting them with skill development and job opportunities. From cities to rural communities, we empower them to rise with confidence and economic independence.
              </motion.p>
              <div className="flex gap-5 flex-col md:flex-row items-center md:items-start justify-between w-full md:gap-6 xl:gap-10 3xl:gap-12">
                <div className="flex flex-col items-center justify-start">
                  <strong className="text-white text-[36px] md:text-[40px] 2xl:text-[54px] 3xl:text-[62px] leading-[140%]"><AnimatedNumber value={437} duration={3}/></strong>
                  <p className="text-white text-sm md:text-base xl:text-xs 2xl:text-lg 3xl:text-xl tracking-[0%]">Districts covered</p>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <strong className="text-white text-[36px] md:text-[40px] 2xl:text-[54px] 3xl:text-[62px] leading-[140%]"><AnimatedNumber value={10} duration={3} /></strong>
                  <p className="text-white text-sm md:text-base xl:text-xs 2xl:text-lg 3xl:text-xl tracking-[0%]">States covered</p>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <strong className="text-white text-[36px] md:text-[40px] 2xl:text-[54px] 3xl:text-[62px] leading-[140%]"><AnimatedNumber value={2000} duration={4}/>+</strong>
                  <p className="text-white text-center max-w-[200px] md:max-w-[255px] xl:max-w-[150px] 3xl:max-w-[255px] text-sm md:text-base xl:text-xs 2xl:text-lg 3xl:text-xl tracking-[0%]">Partnered with educational institutions</p>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Powered by Collaboration Section */}
      <section className="bg-[#f6f7f7]">
        <div className="container py-8 md:py-10 xl:py-12 2xl:py-14 3xl:py-[91px]">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
                variants={leftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} className="flex flex-col items-start justify-center">
              <h2 className='text-black text-center text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-4 md:mb-6 xl:mb-7 3xl:mb-8 font-medium'>Powered by <span className="font-kalam font-bold text-red"> collaboration</span></h2>
              <div className="md:hidden mb-4">
                <Image
                  src="/new-assets/images/about/collaboration.webp"
                  alt="Women in training"
                  width={1200}
                  height={1200}
                  className="rounded-lg max-w-[624px] w-full"
                />
              </div>
              <p className="text-sm md:text-base xl:text-sm 3xl:text-lg 3xl:leading-[30px] max-w-[682px] mb-5 md:mb-0">
              Kaabilprogram.org thrives on collaboration and shared purpose. With Mahindra & Mahindra’s strong foundation, we are creating a sustainable impact. We also work closely with various NGOs, community organizations, and corporate partners to expand the reach and effectiveness of our programs. <br />
              We believe that empowering women is not just about employment—it’s about building a better future for families, communities, and the nation. Kaabilprogram.org is a step toward that brighter, more inclusive future.
              </p>
            </motion.div>

            <motion.div
                variants={rightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} className="hidden md:block">
                <Image
                  src="/new-assets/images/about/collaboration.webp"
                  alt="collaboration"
                  width={1200}
                  height={1200}
                  className="rounded-lg max-w-[624px] w-full"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Impact Section - FIXED SECTION */}
      <section className="relative w-full  py-12 md:py-16 lg:py-36 bg-white overflow-hidden">
        <div className="container impact-section flex flex-col md:flex-row items-start gap-8 xl:gap-0 relative z-10">
          {/* Left Section: Title & Text */}
          <div className="w-full flex-shrink-0 md:w-[300px] lg:w-[350px] text-left flex flex-col justify-center relative">
            {/* Large Background Quote Icon */}
            <div className="absolute top-[-80px] md:top-[-120px] left-[93px] w-[150px] h-[150px] md:w-[220px] md:h-[220px] z-[-1]">
              <Image
                src="/new-assets/images/about/elements/qoute.svg"
                alt="Background Quote Icon"
                width={220}
                height={220}
                className="object-contain opacity-20"
              />
            </div>
            <h2 className='text-black text-start text-2xl md:text-3xl 2xl:text-[40px] 2xl:leading-[36px] mb-4 md:mb-6 xl:mb-7 3xl:mb-8 font-medium'>Our <span className="font-kalam font-bold text-red"> impact</span></h2>
              <p className="text-sm md:text-base 3xl:text-lg 3xl:leading-[30px] md:max-w-[267px]">
              Mahindra has established itself as a lead catalyst and <span className="font-semibold">empowered 770K women</span> through several programs
              </p>
          </div>

          {/* Right Section: Testimonials */}
          <div className="w-[calc(100%_+_200px)] impact-slides-container pl-2 md:pl-0">
            {/* User Details */}
            
            <GallerySlider
                    slides={testimonials}
                    spaceBetween={24}
                    showNavigation
                    arrowColor="white"
                    loop={true}
                    arrowFloat
                    autoplay={true}
                    autoplayDuration={3000}
                    freeMode={false}
                    slidesPerView={2}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.8,
                        },
                        1280: {
                            slidesPerView: 3.3,
                        },
                        1400:{
                            slidesPerView: 2.95,
                        },
                        1700: {
                          spaceBetween:40,
                          slidesPerView: 2.6,
                        },
                      }}
                    />
          </div>
        </div>

        {/* Red Background Block Behind Testimonials */}
        <div className="absolute impact-red-bg top-0 right-0 w-full md:w-[43%] xl:w-[58%] 2xl:w-[60%] 3xl:w-[64%] h-full bg-[#D9333F] z-0"></div>
      </section>
    </main>
  )
}

