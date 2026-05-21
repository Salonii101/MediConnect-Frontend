// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// const RelatedDoctors = ({ speciality, docId }) => {

//     const navigate = useNavigate()
//     const { doctors } = useContext(AppContext)

//     const [relDoc, setRelDoc] = useState([])

//     useEffect(() => {
//         if (doctors.length > 0 && speciality) {
//             const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
//             setRelDoc(doctorsData)
//         }
//     }, [doctors, speciality, docId])

//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Related Doctors</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {relDoc.map((item, index) => (
//                     <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='bg-[#EAEFFF]' src={item.image} alt="" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
//                                 <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
//                             </div>
//                             <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                             <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
//         </div>
//     )
// }

// export default RelatedDoctors



import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(filtered)
    }
  }, [doctors, speciality, docId])

  if (!relDoc.length) return null

  return (
    <section className='flex flex-col items-center gap-4 my-20'>
      <span className='section-tag'>More in {speciality}</span>
      <h2 className='section-title text-center'>Related Doctors</h2>
      <p className='section-sub text-center'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-auto gap-5 pt-6 px-3 sm:px-0'>
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='doctor-card animate-fade-up'
            style={{ animationDelay: `${index * 0.07}s` }}
          >
            <img className='doctor-card-img' src={item.image} alt={item.name} />

            <div className='doctor-card-body'>
              <div className={item.available ? 'badge-avail' : 'badge-unavail'}>
                <span className={`badge-dot ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {item.available ? 'Available' : 'Not Available'}
              </div>
              <p className='mt-2 text-[#0A0F2C] text-base font-semibold leading-snug'>{item.name}</p>
              <p className='text-sm text-gray-500 mt-0.5'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctors