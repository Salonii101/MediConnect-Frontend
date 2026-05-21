// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//     return (
//         <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Find by Speciality</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//             <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
//                 {specialityData.map((item, index) => (
//                     <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
//                         <p>{item.speciality}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default SpecialityMenu


import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section id='speciality' className='flex flex-col items-center gap-4 py-20'>
      {/* Heading */}
      <span className='section-tag'>Browse Specialists</span>
      <h2 className='section-title text-center'>Find by Speciality</h2>
      <p className='section-sub text-center'>
        Browse our extensive list of trusted doctors and schedule your
        appointment hassle-free.
      </p>

      {/* Cards row */}
      <div className='flex sm:justify-center gap-4 pt-6 w-full overflow-x-auto pb-4'
           style={{ scrollbarWidth: 'none' }}>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='spec-card animate-fade-up'
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div className='spec-icon'>
              <img className='w-8 sm:w-10' src={item.image} alt={item.speciality} />
            </div>
            <p className='spec-label'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu