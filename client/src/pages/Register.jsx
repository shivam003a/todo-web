import React, { useState } from 'react'
import '../App.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import instagram from '../assets/instagram.png'
import hide from '../assets/hide.png'
import view from '../assets/view.png'

const Register = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isText, setText] = useState(false)

    const handleFormData = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = formData

        const res = await fetch('api/v1/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })

        if (res.status === 201) {
            toast.success("Signup Successful", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
            navigate('/login')
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
        <div className="register-container">
            <div className='register-card'>
                <div className='register-left'>
                    <Link to='/login' className='register-login'>Login</Link>
                    <div className='register-design'>
                        <div></div>
                        OR
                        <div></div>
                    </div>
                    <p>Connect with us</p>
                    <div className='register-link'>
                        <Link to='https://www.instagram.com/shivam003a' target='_blank'><img src={instagram} className='social-img' alt='instagram'/></Link>
                        <Link to='https://github.com/shivam003a' target='_blank'><img src={github} className='social-img' alt='github'/></Link>
                        <Link to='https://www.linkedin.com/in/shivam003a/' target='_blank'><img src={linkedin} className='social-img' alt='linkedin' /></Link>
                    </div>
                </div>
                <form method="POST" className='register-right' autoComplete='off'>
                    <p>Register</p>
                    <input type="text" name="name" value={formData.name} placeholder="name" autoComplete="off" auto
                        onChange={handleFormData}
                    />
                    <input type="email" name="email" value={formData.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleFormData}
                    />
                    <div className='symbol'>
                        <input type={isText?"text":"password"} name="password" id='login-password' value={formData.password} placeholder="password" autoComplete="off"
                            onChange={handleFormData}
                        />
                        <img src={isText?hide:view} onClick={handleSeePass} alt='register-img'/>
                    </div>
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default Register
