import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import instagram from '../assets/instagram.png'
import hide from '../assets/hide.png'
import view from '../assets/view.png'

const Login = () => {

    const navigate = useNavigate()
    const { setLogged } = useContext(AppContext)
    const [isText, setText] = useState(false)


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleFormData = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formData

        const res = await fetch('api/v1/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        if (res.status === 201) {
            toast.success("Login Successful", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
            setLogged(true)
            navigate('/todos')
        }
        else {
            toast.error("Some Error Occured", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
        }
    }

    const handleSeePass = ()=>{
        setText(!isText)
    }

    return (
        <div className="login-container">
            <div className='login-card'>
                <div className='login-left'>
                    <Link to='/register' className='login-register'>Register</Link>
                    <div className='login-design'>
                        <div></div>
                        OR
                        <div></div>
                    </div>
                    <p>Connect with us</p>
                    <div className='login-link'>
                        <Link to='https://www.instagram.com/shivam003a' target='_blank'><img src={instagram} className='social-img' alt='instagram' /></Link>
                        <Link to='https://github.com/shivam003a' target='_blank'><img src={github} className='social-img' alt='github'/></Link>
                        <Link to='https://www.linkedin.com/in/shivam003a/' target='_blank'><img src={linkedin} className='social-img' alt='linkedin'/></Link>
                    </div>
                </div>
                <form method="POST" className='login-right'>
                    <p>Login</p>
                    <input type="email" name="email" value={formData.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleFormData}
                    />
                    <div className='symbol'>
                        <input type={isText?"text":"password"} name="password" id='login-password' value={formData.password} placeholder="password" autoComplete="off"
                            onChange={handleFormData}
                        />
                        <img src={isText?hide:view} onClick={handleSeePass} alt='login-img' />
                    </div>
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default Login
