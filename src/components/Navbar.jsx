import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navLinks = [
    { to: '/',        label: 'HOME'        },
    { to: '/doctors', label: 'ALL DOCTORS' },
    { to: '/about',   label: 'ABOUT'       },
    { to: '/contact', label: 'CONTACT'     },
  ]

  return (
    <>
      <nav className='navbar-glass'>
        <div className='flex items-center justify-between px-4 sm:px-[10%] py-4'>

          {/* Logo */}
          <img
            onClick={() => navigate('/')}
            className='w-36 cursor-pointer transition-opacity hover:opacity-80'
            src={assets.MediLogo}
            alt="MediConnect"
          />

          {/* Desktop Links */}
          <ul className='hidden md:flex items-center gap-8'>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {({ isActive }) => (
                  <li className={`nav-link ${isActive ? 'nav-active' : ''} ${isActive ? '!text-primary' : ''}`}>
                    {label}
                    <span
                      style={{
                        display: 'block',
                        height: '2px',
                        width: isActive ? '100%' : '0',
                        background: 'linear-gradient(90deg, var(--ac1), var(--ac2))',
                        borderRadius: '2px',
                        marginTop: '3px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </li>
                )}
              </NavLink>
            ))}
          </ul>

          {/* Right side */}
          <div className='flex items-center gap-3'>

            {/* Theme toggle — visible on desktop */}
            <div className='hidden md:block'>
              <ThemeToggle />
            </div>

            {token && userData ? (
              <div className='relative flex items-center gap-2 cursor-pointer group'>
                <img
                  className='w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 transition-all group-hover:ring-primary/50'
                  src={userData.image}
                  alt=""
                />
                <img
                  className='w-2.5 transition-transform duration-200 group-hover:rotate-180'
                  src={assets.dropdown_icon}
                  alt=""
                />
                {/* Dropdown */}
                <div className='absolute top-full right-0 pt-3 z-50 hidden group-hover:block'>
                  <div className='dropdown-menu min-w-[200px]'>
                    <p onClick={() => navigate('/my-profile')}     className='dropdown-item'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='dropdown-item'>My Appointments</p>
                    <p onClick={logout} className='dropdown-item dropdown-item-danger !text-red-500'>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className='btn-primary hidden md:flex'
              >
                Create account
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMenu(true)}
              className='md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors'
              aria-label="Open menu"
            >
              <img className='w-5' src={assets.menu_icon} alt="" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-[200] bg-white transition-all duration-300 ease-in-out
          ${showMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
          <img src={assets.logo} className='w-32' alt="" />
          <button
            onClick={() => setShowMenu(false)}
            className='p-2 rounded-xl hover:bg-gray-100 transition-colors'
          >
            <img src={assets.cross_icon} className='w-5' alt="" />
          </button>
        </div>

        {/* Theme toggle inside mobile menu */}
        <div className='px-6 pt-5 pb-2'>
          <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-3'>Appearance</p>
          <ThemeToggle />
        </div>

        {/* Links */}
        <ul className='flex flex-col px-4 mt-4 gap-1'>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} onClick={() => setShowMenu(false)} to={to} end={to === '/'}>
              {({ isActive }) => (
                <li className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all
                  ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}>
                  {label}
                </li>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Bottom CTA */}
        {!token && (
          <div className='px-4 mt-8'>
            <button
              onClick={() => { navigate('/login'); setShowMenu(false) }}
              className='btn-primary w-full justify-center'
            >
              Create account
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar