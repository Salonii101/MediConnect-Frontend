// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='md:mx-10'>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

//         <div>
//           <img className='mb-5 w-40' src={assets.logo} alt="" />
//           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <li>Home</li>
//             <li>About us</li>
//             <li>Delivery</li>
//             <li>Privacy policy</li>
//           </ul>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//           <ul className='flex flex-col gap-2 text-gray-600'>
//             <li>+1-212-456-7890</li>
//             <li>greatstackdev@gmail.com</li>
//           </ul>
//         </div>

//       </div>

//       <div>
//         <hr />
//         <p className='py-5 text-sm text-center'>Copyright 2024 @ MediConnect.com - All Right Reserved.</p>
//       </div>

//     </div>
//   )
// }

// export default Footer


import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='footer-root pt-14 pb-6 md:mx-0'>
      <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12 mb-12'>

        {/* Brand column */}
        <div>
          <img className='mb-5 w-36' src={assets.MediLogo} alt="MediConnect" />
          <p className='text-sm text-gray-500 leading-7 max-w-sm'>
            MediConnect is your trusted partner for managing healthcare needs
            conveniently. We connect patients with leading doctors to make
            quality care accessible for everyone.
          </p>
          {/* Social row (decorative) */}
          <div className='flex gap-3 mt-6'>
            {['🌐','🐦','💼'].map((icon, i) => (
              <div key={i}
                className='w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white
                  flex items-center justify-center text-sm cursor-pointer transition-all duration-200'>
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <p className='text-xs font-800 tracking-widest uppercase text-gray-800 font-bold mb-5'>
            Company
          </p>
          <ul className='flex flex-col gap-0.5'>
            {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map(link => (
              <li key={link} className='footer-link'>{link}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-xs tracking-widest uppercase text-gray-800 font-bold mb-5'>
            Get in Touch
          </p>
          <ul className='flex flex-col gap-0.5'>
            <li className='footer-link'>+1-212-456-7890</li>
            <li className='footer-link'>mediConnect@gmail.com</li>
          </ul>

          {/* Mini badge */}
          <div className='mt-6 inline-flex items-center gap-2 bg-green-50 border border-green-200
            text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-500'></span>
            24/7 Support Available
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <p className='text-xs text-gray-400'>
          © 2024 MediConnect.com — All Rights Reserved.
        </p>
        <div className='flex gap-5 text-xs text-gray-400'>
          <span className='hover:text-primary cursor-pointer transition-colors'>Terms of Service</span>
          <span className='hover:text-primary cursor-pointer transition-colors'>Privacy Policy</span>
          <span className='hover:text-primary cursor-pointer transition-colors'>Cookie Policy</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer