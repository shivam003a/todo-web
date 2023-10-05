import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Hero = () => {

	const {logged} = useContext(AppContext)
	return (
		<div className='hero'>
			<div>
				<h1 className='hero-heading'>Organize Your Day <br />Efficiently</h1>
				<p className='hero-desc'>Boost productivity with our user-friendly Todo List. Stay on top of your tasks and never miss a deadline.</p>
				<Link className='get-started' to={logged?'/todos':'/login'}>Get Started</Link>
			</div>
		</div>
	)
}

export default Hero
