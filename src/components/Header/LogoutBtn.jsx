import React from 'react'
import authservice from '../../appwrite/Auth'
import {logout} from '../../store/authslice'
import { useDispatch } from 'react-redux'
// import { IoMdLogOut } from "react-icons/io";


function LogoutBtn() {
    const dispatch = useDispatch()
    function logoutHandler(){
        authservice.logout()
            .then(()=>{
                dispatch(logout())
            })
    }
  return (
    <button onClick={logoutHandler} className='inline-bock px-6 py-2 duration-200 text-2xl  font-semibold text-red-500 '><span>logout</span></button>
  )
}

export default LogoutBtn