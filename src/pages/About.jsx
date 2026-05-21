// import React from 'react'
// import { assets } from '../assets/assets'

// const About = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 text-[#707070]'>
//         <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-12'>
//         <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
//           <p>Welcome to MediConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
//           <p>MediConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediConnect is here to support you every step of the way.</p>
//           <b className='text-gray-800'>Our Vision</b>
//           <p>Our vision at MediConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
//         </div>
//       </div>

//       <div className='text-xl my-4'>
//         <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
//       </div>

//       <div className='flex flex-col md:flex-row mb-20'>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>EFFICIENCY:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>CONVENIENCE: </b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>PERSONALIZATION:</b>
//           <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default About



import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  const reasons = [
    {
      title: 'EFFICIENCY',
      desc:  'Streamlined appointment scheduling that fits into your busy lifestyle.',
    },
    {
      title: 'CONVENIENCE',
      desc:  'Access to a network of trusted healthcare professionals in your area.',
    },
    {
      title: 'PERSONALISATION',
      desc:  'Tailored recommendations and reminders to help you stay on top of your health.',
    },
  ]

  return (
    <div className='pt-6 pb-10'>

      {/* ---- Page title ---- */}
      <div className='flex flex-col items-center gap-2 mb-14 animate-fade-up'>
        <span className='section-tag'>Our Story</span>
        <h1 className='section-title'>About <span className='gradient-text'>Us</span></h1>
      </div>

      {/* ---- Story section ---- */}
      <div className='flex flex-col md:flex-row gap-14 mb-20 animate-fade-up delay-200'>
        <div className='md:w-[380px] flex-shrink-0'>
          <img
            className='w-full rounded-2xl shadow-lg object-cover'
            src={assets.about_image}
            alt="About MediConnect"
          />
        </div>

        <div className='flex flex-col justify-center gap-6 text-gray-600 text-[0.94rem] leading-relaxed'>
          <p>
            Welcome to <strong className='text-gray-800'>MediConnect</strong>, your trusted partner in managing
            your healthcare needs conveniently and efficiently. We understand the challenges individuals
            face when scheduling doctor appointments and managing health records.
          </p>
          <p>
            MediConnect is committed to excellence in healthcare technology. We continuously enhance our
            platform, integrating the latest advancements to improve user experience and deliver superior
            service — whether you're booking your first appointment or managing ongoing care.
          </p>

          <div className='p-6 rounded-2xl border-l-4 border-primary bg-primary/5'>
            <p className='text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide'>Our Vision</p>
            <p>
              To create a seamless healthcare experience for every user — bridging the gap between patients
              and healthcare providers so quality care is always within reach.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Why choose us ---- */}
      <div className='mb-4 animate-fade-up delay-300'>
        <span className='section-tag'>Why Us</span>
        <h2 className='section-title mt-2 mb-8'>
          Why <span className='gradient-text'>Choose MediConnect</span>
        </h2>
      </div>

      <div className='flex flex-col md:flex-row gap-5 mb-16'>
        {reasons.map(({ title, desc }, i) => (
          <div key={i} className='why-card animate-fade-up' style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
            <div className='why-card-content'>
              <span className='why-card-num'>0{i + 1}</span>
              <p className='font-bold text-gray-900 text-sm tracking-wider mt-4 mb-2'>{title}</p>
              <p className='text-gray-600 text-sm leading-relaxed'>{desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default About