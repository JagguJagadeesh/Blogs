import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {LogoutBtn, Container, Logo} from '../index'

function Header() {
  const authStatus = useSelector((state)=>state.auth.status)
  // const navigate = useNavigate()
  const navitems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'login',
      slug:'/login',
      active:!authStatus
    },
    {
      name:'Signup',
      slug:'/signup',
      active:!authStatus
    },
    {
      name:'all-posts',
      slug:'/all-posts',
      active:authStatus
    },
    {
      name:'add-posts',
      slug:'/add-posts',
      active:authStatus
    }
  ]

  return (
    <header className='py-3  mb-20 shadow bg-gray-400'>
      <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <Link to='/'><Logo /></Link>
        </div>
        <ul className='flex items-center text-black gap-6 ml-auto'>
          {
            navitems.map((item)=>(
              item.active?
              <li key={item.name}>
                <NavLink 
                className={({ isActive }) =>
                  isActive ? "underline text-lg font-semibold " : "text-lg font-semibold  "
                }
                to={item.slug}>
                  {item.name}
                </NavLink>
              </li> : null
            ))
          }
          {authStatus && (
            <li >
            <LogoutBtn/>
            </li>
          )}
        </ul>
      </nav>
      </Container>
    </header>
  )
}

export default Header