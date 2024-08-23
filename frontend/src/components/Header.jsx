import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "../redux/user/userSlice";
function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleSignout = async (e) => {
        try {
            console.log("url", import.meta.env.VITE_BASE_URL)
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signout`)
            dispatch(signOut())
            navigate('/sign-in')

        } catch (error) {
            console.log(error)
            swal('Failed to Logout')
        }
    }

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    return (
        <div className='bg-red-200 sticky top-0 z-50'>
            <div className='flex justify-between items-center mx-auto py-4 px-10'>
                <Link to={'/'}>
                    <h3 className='text-red-900 rounded-lg font-extrabold text-3xl'>Project App</h3>
                </Link>

                <button
                    className={`block lg:hidden p-3 text-white`}
                    onClick={toggleMenu}
                >
                    <span className="text-2xl">☰</span>
                </button>


                <div className='hidden lg:flex lg:items-center lg:space-x-7 '>
                    <ul className='flex flex-row gap-7'>
                        <Link to={'/'}>
                            <li className=" text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">Home</li>
                        </Link>
                        {currentUser ? (
                            <>
                                <button onClick={handleSignout} className=" text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignOut</button>
                            </>
                        ) : (
                            <>
                                <Link to={'/sign-in'}>
                                    <li className="text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignIn</li>
                                </Link>
                                <Link to={'/sign-up'}>
                                    <li className="text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignUp</li>
                                </Link>
                            </>
                        )}


                    </ul>
                </div>



            </div>
            <div className={`lg:hidden absolute top-16 right-0 bg-red-300 w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className='flex flex-col gap-4'>
                    <Link to={'/'}>
                        <li className=" text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">Home</li>
                    </Link>
                    {currentUser ? (
                        <button onClick={handleSignout} className=" text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignOut</button>
                    ) : (
                        <>
                            <Link to={'/sign-in'}>
                                <li className="text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignIn</li>
                            </Link>
                            <Link to={'/sign-up'}>
                                <li className="text-red-900 font-bold p-3 rounded-lg hover:text-white hover:bg-red-700">SignUp</li>
                            </Link>
                        </>
                    )}

                </ul>
            </div>
        </div>
    )
}

export default Header