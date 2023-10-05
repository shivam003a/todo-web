import './App.css';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Register from './pages/Register'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Todo from './pages/Todo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AppContextProvider from './context/AppContext'
import Navbar from './components/Navbar';

function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<div className='wrapper'>
					<Navbar />
					<Routes>
						<Route path='/' element={<Hero />} />
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
						<Route path='/todos' element={<Todo />} />
						<Route path='/logout' element={<Todo />} />
					</Routes>
				</div>
				<ToastContainer />
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default App;
