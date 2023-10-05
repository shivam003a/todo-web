import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import SingleTodo from './SingleTodo'
import Loading from './Loading'

const GetTodos = () => {

	const [todoList, setTodoList] = useState([])
	const { changed, isLoading, setLoading} = useContext(AppContext)

	const getTodos = async () => {
		setLoading(true)
		const res = await fetch('/api/v1/get-todo', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await res.json()

		setTodoList(data.data)
		setLoading(false)
	}

	useEffect(() => {
		getTodos()
	}, [changed])

	return (
		<div className='todoList'>
			{
				isLoading?<Loading /> :
				todoList &&
				todoList.map((value, index) => {
					return (
						<SingleTodo value={value} key={index}/>
					)
				})
			}
		</div>
	)
}

export default GetTodos
