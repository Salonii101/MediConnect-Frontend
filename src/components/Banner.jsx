// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const Banner = () => {

//     const navigate = useNavigate()

//     return (
//         <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

//             {/* ------- Left Side ------- */}
//             <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
//                 <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//                     <p>Book Appointment</p>
//                     <p className='mt-4'>With 100+ Trusted Doctors</p>
//                 </div>
//                 <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create account</button>
//             </div>

//             {/* ------- Right Side ------- */}
//             <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//                 <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
//             </div>
//         </div>
//     )
// }

// export default Banner


import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='banner-bg rounded-2xl px-8 sm:px-12 md:px-16 lg:px-20 my-20 md:mx-0'>
      <div className='flex items-center justify-between gap-8'>

        {/* Left */}
        <div className='flex-1 py-10 sm:py-12 md:py-16 lg:py-20 relative z-10 animate-fade-up'>

          <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25
            text-white text-xs font-semibold tracking-widest uppercase
            px-4 py-2 rounded-full mb-5'>
            <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>
            Join 50,000+ Patients
          </div>

          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6'
              style={{ fontFamily: "'Fraunces', serif" }}>
            Book Appointment<br />
            <span className='text-white/80'>With 100+ Trusted Doctors</span>
          </h2>

          <button
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='btn-white'
          >
            Create Account — It's Free
          </button>
        </div>

        {/* Right: doctor image */}
        <div className='hidden md:flex md:w-5/12 lg:w-[340px] justify-end relative'>
          <img
            className='w-full relative bottom-0 right-0 max-w-sm hero-float'
            src={assets.appointment_img}
            alt="Book appointment"
          />
        </div>

      </div>
    </div>
  )
}

export default Banner