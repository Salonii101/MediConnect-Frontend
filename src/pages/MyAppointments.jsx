import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
      if (data.success) {
        window.location.replace(data.session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className='pt-6 pb-16 animate-fade-up'>

      {/* Page title */}
      <div className='flex flex-col gap-1 mb-10'>
        <span className='section-tag'>Dashboard</span>
        <h1 className='section-title'>My <span className='gradient-text'>Appointments</span></h1>
      </div>

      {appointments.length === 0 ? (
        /* Empty state */
        <div className='glass-card flex flex-col items-center justify-center py-24 gap-4 text-center'>
          <p className='text-5xl'>🗓️</p>
          <p className='text-lg font-semibold' style={{ color: 'var(--tx-h)' }}>No appointments yet</p>
          <p className='text-sm' style={{ color: 'var(--tx-m)' }}>Book your first appointment to get started.</p>
          <button onClick={() => navigate('/doctors')} className='btn-primary mt-2'>
            Find a Doctor
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          {appointments.map((item, index) => (
            <div
              key={index}
              className='glass-card p-5 sm:p-6 flex flex-col sm:flex-row gap-5 animate-fade-up'
              style={{ animationDelay: `${Math.min(index, 5) * 0.06}s` }}
            >
              {/* Doctor image */}
              <div className='flex-shrink-0'>
                <img
                  className='w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover'
                  style={{ background: 'var(--bg-card2)' }}
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex flex-wrap items-start justify-between gap-2 mb-3'>
                  <div>
                    <p className='text-base font-bold' style={{ color: 'var(--tx-h)' }}>{item.docData.name}</p>
                    <p className='text-sm' style={{ color: 'var(--tx-m)' }}>{item.docData.speciality}</p>
                  </div>

                  {/* Status badge */}
                  {item.isCompleted && (
                    <span className='appt-btn appt-completed text-xs'>✓ Completed</span>
                  )}
                  {item.cancelled && !item.isCompleted && (
                    <span className='appt-btn appt-cancelled text-xs'>✕ Cancelled</span>
                  )}
                  {item.payment && !item.isCompleted && !item.cancelled && (
                    <span className='appt-btn appt-paid text-xs'>✓ Paid</span>
                  )}
                </div>

                {/* Details grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm mb-4'>
                  <div className='flex items-start gap-2'>
                    <span style={{ color: 'var(--tx-m)' }}>📍</span>
                    <span style={{ color: 'var(--tx-s)' }}>
                      {item.docData.address.line1}
                      {item.docData.address.line2 && `, ${item.docData.address.line2}`}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span style={{ color: 'var(--tx-m)' }}>🗓</span>
                    <span style={{ color: 'var(--tx-b)' }} className='font-medium'>
                      {slotDateFormat(item.slotDate)} · {item.slotTime}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className='flex flex-wrap gap-2'>
                  {/* Pay online trigger */}
                  {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                    <button
                      onClick={() => setPayment(item._id)}
                      className='appt-btn appt-pay'
                    >
                      Pay Online
                    </button>
                  )}

                  {/* Payment methods */}
                  {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                    <>
                      <button
                        onClick={() => appointmentStripe(item._id)}
                        className='appt-btn appt-pay'
                      >
                        <img className='h-5 max-w-[80px] object-contain' src={assets.stripe_logo} alt='Stripe' />
                      </button>
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className='appt-btn appt-pay'
                      >
                        <img className='h-5 max-w-[80px] object-contain' src={assets.razorpay_logo} alt='Razorpay' />
                      </button>
                      <button
                        onClick={() => setPayment('')}
                        className='appt-btn appt-cancel text-xs px-3'
                      >
                        ✕ Cancel
                      </button>
                    </>
                  )}

                  {/* Cancel appointment */}
                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='appt-btn appt-cancel'
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments