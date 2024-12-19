import React,{useState} from 'react'
import { Input,Button,Logo } from './index'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import authservice from '../appwrite/Auth'
import { login } from '../store/authslice'
import { useForm } from 'react-hook-form'

function Signup() {
    const [error,seterror] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()

    const signup = async (data)=>{
        seterror("")
        try {
            const userData = await authservice.signup(data)
            if(userData){
                const userData = await authservice.getcurrentuser()
                if(userData) dispatch(login());
                navigate('/')
            }
        } catch (error) {
            seterror(error.message)
        }
    }
  return (
    <div className='container bg-gray-400 rounded-lg mb-16 mx-auto max-w-md p-8'>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className='w-full  flex flex-col gap-4'>
          <Logo className='text-center'/>
            <h1 className="text-2xl font-semibold text-center">Register to Login...</h1>
            <form onSubmit={handleSubmit(signup)} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Your Full Name"
              {...register('name',{
                required:true
              })}
              />
              <Input
              type="email"
              placeholder="Enter Your Email"
              {...register('email',{
                required:true,
                validate:{
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                }
              })}
              />
              <Input
              type="password"
              placeholder="Enter Your Password"
              {...register('password',{
                required:true
              })}
              />
              <Button type="submit" className="w-full" text="Sign Up"></Button>
            </form>
            <p className="mt-2 text-center text-base text-white">
            Already have an account?&nbsp;
              <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                  log in
              </Link>
            </p>
        </div>
    </div>
  )
}

export default Signup