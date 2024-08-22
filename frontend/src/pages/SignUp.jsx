import { Link } from "react-router-dom"

export default function SignUp() {
    return (
        <div className='max-w-lg mx-auto pt-32'>
            <h1 className='text-3xl text-center font-semibold my-10 text-red-900'>Sign Up</h1>
            <form className='flex flex-col gap-4'>
                <input type="text" placeholder='Enter username...' id='name' className='bg-red-100 p-3 rounded-lg  text-red-900' required />
                <input type="email" placeholder='Enter email...' id='email' className='bg-red-100 p-3 rounded-lg  text-red-900' required />
                <input type="password" placeholder='Enter password...' id='password' className='bg-red-100 p-3 rounded-lg  text-red-900' required />
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
