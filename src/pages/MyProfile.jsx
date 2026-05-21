import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (!userData) return null

  return (
    <div className='pt-6 pb-16 animate-fade-up'>

      {/* Page title */}
      <div className='flex flex-col gap-1 mb-10'>
        <span className='section-tag'>Account</span>
        <h1 className='section-title'>My <span className='gradient-text'>Profile</span></h1>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>

        {/* ── Left: avatar + name card ── */}
        <div className='glass-card p-8 flex flex-col items-center gap-5 lg:w-72 flex-shrink-0 text-center'>
          {/* Avatar */}
          {isEdit ? (
            <label htmlFor='image' className='cursor-pointer group relative'>
              <img
                className='w-32 h-32 rounded-2xl object-cover ring-4 ring-primary/20 transition-all group-hover:ring-primary/40 opacity-80'
                src={image ? URL.createObjectURL(image) : userData.image}
                alt={userData.name}
              />
              <div className='absolute inset-0 flex items-center justify-center rounded-2xl
                bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
                <img className='w-8' src={assets.upload_icon} alt='Upload' />
              </div>
              <input onChange={e => setImage(e.target.files[0])} type='file' id='image' hidden />
            </label>
          ) : (
            <img
              className='w-32 h-32 rounded-2xl object-cover ring-4 ring-primary/20'
              src={userData.image}
              alt={userData.name}
            />
          )}

          {/* Name */}
          {isEdit ? (
            <input
              className='input-pro text-center text-xl font-bold'
              type='text'
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <div>
              <p className='text-xl font-bold' style={{ color: 'var(--tx-h)' }}>{userData.name}</p>
              <p className='text-sm mt-0.5' style={{ color: 'var(--tx-m)' }}>{userData.email}</p>
            </div>
          )}

          {/* Status badge */}
          <div className='flex items-center gap-2 bg-green-50 border border-green-200
            text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse'></span>
            Active Patient
          </div>

          {/* Action buttons */}
          <div className='flex flex-col gap-2 w-full mt-2'>
            {isEdit ? (
              <>
                <button
                  onClick={updateUserProfileData}
                  className='btn-primary justify-center w-full py-2.5'
                >
                  Save Changes
                </button>
                <button
                  onClick={() => { setIsEdit(false); setImage(false) }}
                  className='btn-outline justify-center w-full py-2.5 text-sm'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='btn-outline justify-center w-full py-2.5'
              >
                ✏ Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* ── Right: info panels ── */}
        <div className='flex-1 flex flex-col gap-6'>

          {/* Contact Information */}
          <div className='glass-card p-8'>
            <span className='profile-section-label'>Contact Information</span>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5'>

              {/* Email */}
              <div>
                <label className='input-label'>Email Address</label>
                <p className='text-sm font-medium' style={{ color: 'var(--ac1)' }}>{userData.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className='input-label'>Phone Number</label>
                {isEdit ? (
                  <input
                    className='input-pro'
                    type='text'
                    value={userData.phone}
                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder='+1 234 567 8900'
                  />
                ) : (
                  <p className='text-sm font-medium' style={{ color: 'var(--ac1)' }}>{userData.phone || '—'}</p>
                )}
              </div>

              {/* Address — spans both columns */}
              <div className='sm:col-span-2'>
                <label className='input-label'>Address</label>
                {isEdit ? (
                  <div className='flex flex-col gap-2'>
                    <input
                      className='input-pro'
                      type='text'
                      value={userData.address.line1}
                      placeholder='Street address'
                      onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    />
                    <input
                      className='input-pro'
                      type='text'
                      value={userData.address.line2}
                      placeholder='City, State, ZIP'
                      onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    />
                  </div>
                ) : (
                  <p className='text-sm leading-relaxed' style={{ color: 'var(--tx-s)' }}>
                    {userData.address.line1 || '—'}
                    {userData.address.line2 && <><br />{userData.address.line2}</>}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Basic Information */}
          <div className='glass-card p-8'>
            <span className='profile-section-label'>Basic Information</span>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5'>

              {/* Gender */}
              <div>
                <label className='input-label'>Gender</label>
                {isEdit ? (
                  <select
                    className='input-pro'
                    value={userData.gender}
                    onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value='Not Selected'>Not Selected</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                ) : (
                  <p className='text-sm font-medium' style={{ color: 'var(--tx-b)' }}>{userData.gender || '—'}</p>
                )}
              </div>

              {/* Birthday */}
              <div>
                <label className='input-label'>Date of Birth</label>
                {isEdit ? (
                  <input
                    className='input-pro'
                    type='date'
                    value={userData.dob}
                    onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                ) : (
                  <p className='text-sm font-medium' style={{ color: 'var(--tx-b)' }}>{userData.dob || '—'}</p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile