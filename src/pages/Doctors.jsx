
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const specialities = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => { applyFilter() }, [doctors, speciality])

  return (
    <div className='pt-6 pb-10'>

      {/* Page header */}
      <div className='mb-8 animate-fade-up'>
        <span className='section-tag'>Find a Doctor</span>
        <h1 className='section-title mt-2'>Browse Specialists</h1>
        <p className='section-sub mt-2'>
          Filter by speciality and find the right doctor for your needs.
        </p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6'>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className={`sm:hidden px-4 py-2 rounded-xl border text-sm font-semibold transition-all
            ${showFilter
              ? 'bg-primary text-white border-primary'
              : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
        >
          {showFilter ? '✕ Hide Filters' : '⚙ Filters'}
        </button>

        {/* Sidebar */}
        <aside className={`flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'} sm:w-52 flex-shrink-0`}>
          <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1'>
            Speciality
          </p>
          {specialities.map(sp => (
            <button
              key={sp}
              onClick={() =>
                speciality === sp
                  ? navigate('/doctors')
                  : navigate(`/doctors/${sp}`)
              }
              className={`filter-item text-left ${speciality === sp ? 'filter-item-active' : ''}`}
            >
              {sp}
            </button>
          ))}
        </aside>

        {/* Doctor grid */}
        <div className='flex-1 grid grid-cols-auto gap-5 gap-y-6'>
          {filterDoc.length === 0 ? (
            <div className='col-span-full text-center py-20 text-gray-400'>
              <p className='text-4xl mb-4'>🔍</p>
              <p className='text-lg font-medium'>No doctors found</p>
              <p className='text-sm mt-1'>Try selecting a different speciality</p>
            </div>
          ) : (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                className='doctor-card animate-fade-up'
                style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
              >
                <img className='doctor-card-img' src={item.image} alt={item.name} />
                <div className='doctor-card-body'>
                  <div className={item.available ? 'badge-avail' : 'badge-unavail'}>
                    <span className={`badge-dot ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {item.available ? 'Available' : 'Not Available'}
                  </div>
                  <p className='mt-2 text-[#0A0F2C] text-base font-semibold'>{item.name}</p>
                  <p className='text-sm text-gray-500 mt-0.5'>{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors
