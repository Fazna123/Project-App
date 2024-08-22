import { Link } from "react-router-dom"
export default function SignIn() {
    return (
        <div className='max-w-lg mx-auto pt-32'>
            <h1 className='text-3xl text-center font-semibold my-10 text-red-900'>Sign In</h1>
            <form className='flex flex-col gap-4'>

                <input type="email" placeholder='Enter email...' id='email' className='bg-red-100 p-3 rounded-lg text-red-900' required />
                <input type="password" placeholder='Enter password...' id='password' className='bg-red-100 p-3 rounded-lg text-red-900' required />
                <button className='bg-red-800 text-white font-bold uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>Login</button>
            </form>
            <div className='flex gap-2'>
                <p className="text-red-900">Don't have an account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-500'>Register</span>
                </Link>
            </div>

        </div>
    )
}
