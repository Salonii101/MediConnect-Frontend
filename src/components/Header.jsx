import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

// Refined gradients — deep anchor on the left, rich mid-tone, muted highlight on the right
// Avoids harsh neon blowout; each theme has a consistent "dark → mid → accent → muted glow" feel
const THEME_GRADIENTS = {
  light:  'linear-gradient(118deg, #020E2E 0%, #0A2D8A 35%, #0B5FA0 65%, #0A7080 100%)',
  dark:   'linear-gradient(118deg, #020914 0%, #0B1E42 35%, #0E3468 65%, #124A8C 100%)',
  forest: 'linear-gradient(118deg, #021208 0%, #054020 35%, #076636 65%, #0A8050 100%)',
  purple: 'linear-gradient(118deg, #0D0120 0%, #2D0875 35%, #4C12B0 65%, #6A28D4 100%)',
  sunset: 'linear-gradient(118deg, #1C0800 0%, #6B2800 35%, #A04005 65%, #C06010 100%)',
  rose:   'linear-gradient(118deg, #16000A 0%, #5C0020 35%, #8E0A30 65%, #AA1840 100%)',
}

const getGradient = () => {
  const theme = document.documentElement.getAttribute('data-theme') || 'light'
  return THEME_GRADIENTS[theme] ?? THEME_GRADIENTS.light
}

const Header = () => {
  const [gradient, setGradient] = useState(getGradient)

  useEffect(() => {
    setGradient(getGradient())

    const observer = new MutationObserver(() => setGradient(getGradient()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className='rounded-2xl px-8 md:px-14 lg:px-20 mt-6 mb-2 overflow-hidden'
      style={{ background: gradient, transition: 'background 0.5s ease' }}
    >
      <div className='flex flex-col md:flex-row items-end gap-0'>

        {/* ---- Left ---- */}
        <div className='md:w-1/2 flex flex-col gap-5 py-12 md:py-[9vw] md:pb-10 animate-fade-up'>

          {/* Eyebrow tag */}
          <span className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25
            text-white text-xs font-semibold tracking-widest uppercase
            px-4 py-2 rounded-full w-fit'>
            <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>
            100+ Trusted Doctors
          </span>

          {/* Headline */}
          <h1
            className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight'
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Book Appointment<br />
            <span className='text-white/80'>With Trusted Doctors</span>
          </h1>

          {/* Sub copy */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4
            text-white/80 text-sm font-light leading-relaxed'>
            <img className='w-24 flex-shrink-0 drop-shadow-lg' src={assets.group_profiles} alt="Patient profiles" />
            <p>
              Browse our extensive list of trusted doctors<br className='hidden sm:block' />
              and schedule your appointment hassle-free.
            </p>
          </div>

          {/* CTA */}
          <a
            href='#speciality'
            className='inline-flex items-center gap-2 bg-white text-gray-700 font-semibold
              text-sm px-7 py-3 rounded-full w-fit mt-2 hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl'
          >
            Book Appointment
            <img className='w-3.5' src={assets.arrow_icon} alt="" />
          </a>
        </div>

        {/* ---- Right: image flush to bottom ---- */}
        <div className='md:w-1/2 flex justify-end items-end self-end'>
          <img
            className='w-full max-w-md h-auto object-contain object-bottom block'
            src={assets.header_img}
            alt="Doctor illustration"
            style={{ maxHeight: '420px' }}
          />
        </div>

      </div>
    </div>
  )
}

export default Header