import { Link } from "react-router-dom";
import { useState,useContext } from 'react'
import axios from '../helpers/axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/Authcontext';


export default function SigninForm() {
    let navigate = useNavigate();
    let {dispatch} = useContext(AuthContext)
    
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [error,setErrors] = useState('')
    


    
    let login = async (e) => {
        try 
        {
            e.preventDefault();
            setErrors([])
            let data = {email,password}
            let res = await axios.post('/api/users/login',data,{
                withCredentials : true
            })
            if(res.status==200){
                dispatch({type : 'LOGIN',payload : res.data.user})
                navigate('/') }}
        catch (e){
            setErrors(e.response.data.error)

        }
    }

    

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login Form</h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={login} class="space-y-6" action="#" method="POST">
        
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email 
            </label>
            <div class="mt-2">
    <input value= {email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" autocomplete="email"  class="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    {!!(error) && <p className="text-red-500">{error}</p>}
    </div>
    </div>
    <div>
        <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm"><Link to="/sign-up" class="font-semibold text-indigo-600 hover:text-indigo-500">Register Here</Link></div></div><div class="mt-2">
                <input value= {password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                
                </div>
                </div>
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                    </form>
    
    </div></div>
    
  )
}
