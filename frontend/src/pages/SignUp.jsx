import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

export default function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError('')
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, formData)

            const data = response.data

            if (data.success = true) {
                setLoading(false)
                swal('Success', data.message)
                navigate('/sign-in')
            }
            else {
                setLoading(false)
                swal('Error', data.message, 'error')

            }

        } catch (error) {
            setLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)

                swal('Error!', error?.response?.data.message,)
            } else {
                setError('Error', 'Something went wrong')
            }

        }
    }


    return (
        <div className='max-w-lg mx-auto pt-32'>
            <h1 className='text-3xl text-center font-semibold my-10 text-red-900'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" placeholder='Enter username...' id='name' className='bg-red-100 p-3 rounded-lg  text-red-900' onChange={handleChange} required />
                <input type="email" placeholder='Enter email...' id='email' className='bg-red-100 p-3 rounded-lg  text-red-900' onChange={handleChange} required />
                <input type="password" placeholder='Enter password...' id='password' className='bg-red-100 p-3 rounded-lg  text-red-900' onChange={handleChange} required />
                <button className='bg-red-800 text-white font-bold uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>Register</button>
            </form>
            <div className='flex gap-2'>
                <p className=" text-red-900">Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-500'>SignIn</span>
                </Link>
            </div>
            {/* {error && <p className='text-red-700 mt-5'>{error}</p>} */}
        </div>
    )
}
