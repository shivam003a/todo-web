import React from 'react'
import CreateTodo from '../components/CreateTodo'
import GetTodos from '../components/GetTodos'

const Todo = () => {
  return (
    <div className='todoListPage'>
      <CreateTodo />
      <GetTodos />
    </div>
  )
}

export default Todo
