import { useEffect, useState } from "react"
import authservice from "./appwrite/Auth"
import { useDispatch } from "react-redux"
import {login,logout} from "./store/authslice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"


function App() {
  const [loading,setloading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    authservice.getcurrentuser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>setloading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-600 text-white'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (<h1>Loading....</h1>)
}

export default App
