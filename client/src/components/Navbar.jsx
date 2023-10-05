import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import menu from '../assets/menu.png'

const Navbar = () => {

    const {logged, setLogged} = useContext(AppContext)
    const navigate = useNavigate()
    useEffect(() => {
        const cookieValue = Cookies.get('todoListCookie');
        if(cookieValue){
            setLogged(true);
        }
    }, [logged])
    const [isActive, setIsActive] = useState(false);

    const handleLogout = async()=>{
        const res = await fetch('/api/v1/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        Cookies.remove('todoListCookie')
        const data = await res.json();
        setLogged(false);

        if(res.status === 200){
            toast.success("Logged Out", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
            navigate('/login')
            setIsActive(false)
        }
        else{
            toast.error("Some Error Occurred", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
        }
    }

    const handleNavigation = (e)=>{
        setIsActive(!isActive)
    }

    const handleClick = ()=>{
        setIsActive(false)
    }

    return (
        <div className='nav'>
            <div>
                <Link to='/' className='logo-link'><p className='logo'>Todo-List</p></Link>
                <div className='underline-logo'></div>
            </div>
            <div className={isActive?"navigation n-active":"navigation"} >
                <NavLink to='/' onClick={handleClick}>Home</NavLink>
                {
                    !logged && <NavLink to='/register' onClick={handleClick}>Register</NavLink>
                }
                {
                    !logged && <NavLink to='/login' onClick={handleClick}>Login</NavLink>
                }
                {
                    logged && <NavLink to='/todos' onClick={handleClick}>Todos</NavLink>
                }
                {
                    logged && <NavLink to='/logout' onClick={handleLogout}>Logout</NavLink>
                }
            </div>
            <img src={menu} alt='menu' className='menu-button' onClick={handleNavigation}/>
        </div>
    )
}

export default Navbar
