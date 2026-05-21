import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='pt-6 pb-10'>

      {/* Title */}
      <div className='flex flex-col items-center gap-2 mb-14 animate-fade-up'>
        <span className='section-tag'>Reach Out</span>
        <h1 className='section-title'>Contact <span className='gradient-text'>Us</span></h1>
      </div>

      {/* Main grid */}
      <div className='flex flex-col md:flex-row gap-12 mb-20'>
        {/* Image */}
        <div className='md:w-[380px] flex-shrink-0 animate-fade-left delay-100'>
          <img
            className='w-full rounded-2xl shadow-lg object-cover'
            src={assets.contact_image}
            alt="Contact us"
          />
        </div>

        {/* Info */}
        <div className='flex flex-col justify-center gap-8 animate-fade-right delay-200'>

          {/* Office */}
          <div>
            <p className='section-tag'>Our Office</p>
            <div className='mt-3 flex flex-col gap-3 text-gray-600 text-sm leading-relaxed'>
              <div className='flex items-start gap-3'>
                <span className='text-xl mt-0.5'>📍</span>
                <p>54709 Willms Station, Suite 350<br />Washington, USA</p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-xl mt-0.5'>📞</span>
                <p>(415) 555-0132</p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-xl mt-0.5'>✉️</span>
                <p>greatstackdev@gmail.com</p>
              </div>
            </div>
          </div>

          <hr className='border-gray-100' />

          {/* Careers */}
          <div>
            <p className='section-tag'>Careers at MediConnect</p>
            <p className='mt-3 text-gray-600 text-sm leading-relaxed mb-5'>
              Learn more about our teams and job openings. We're always looking
              for passionate people to join us.
            </p>
            <button className='btn-outline text-sm'>
              Explore Jobs →
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact