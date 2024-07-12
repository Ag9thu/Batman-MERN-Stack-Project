import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from '../helpers/axios'
import { useNavigate } from 'react-router-dom'


export default function SignupForm() {
    let navigate = useNavigate();
    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    let [errors,setErrors] = useState('')


    
    let register = async (e) => {
        try 
        {
            e.preventDefault();
            setErrors([])
            let data = {name,email,password}
            let res = await axios.post('/api/users/register',data,{
                withCredentials : true
            })
            if(res.status==200){
                navigate('/') }}
        catch (e){
            setErrors(e.response.data.errors)

        }
    }

    

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register Form</h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={register} class="space-y-6" action="#" method="POST">
        <div>
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
            Name
            </label>

            <div class="mt-2">
    <input  value= {name} onChange={(e)=>setName(e.target.value)} id="name" name="name" type="string" autocomplete="name"  class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    {!!(errors && errors.name) && <p className="text-red-500">{errors.name.msg}</p>}
    </div>
    </div>
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email 
            </label>
            <div class="mt-2">
    <input value= {email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" autocomplete="email"  class="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
    {!!(errors &&errors.email) && <p className="text-red-500">{errors.email.msg}</p>}
    </div>
    </div>
    <div>
        <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm"><Link to="/sign-in" class="font-semibold text-indigo-600 hover:text-indigo-500">Login Here</Link></div></div><div class="mt-2">
                <input value= {password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password"  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {!!(errors &&errors.password) && <p className="text-red-500">{errors.password.msg}</p>}
                </div>
                </div>
                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                    </div>
                    </form>
    
    </div></div>
    
  )
}
