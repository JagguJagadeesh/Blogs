import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function ProtectedLayout({children,authentication=true}) {
    const [loader,setloader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)
    const navigate = useNavigate()
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setloader(false)
    },[authentication, authStatus, navigate])
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default ProtectedLayout