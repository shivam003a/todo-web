import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import deleteImg from '../assets/delete.png'

const SingleTodo = ({ value }) => {

    const { setChanged } = useContext(AppContext)

    const deleteTodo = async (e) => {
        const todo_id = e.target.id;
        console.log(e.target)

        const res = await fetch('/api/v1/delete-todo', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todo_id
            })
        })

        const data = await res.json()
        setChanged(data);

        if (res.status === 200) {
            toast.success("Deleted Todo", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
        }
        else {
            toast.error("Some Error Occured", {
                draggable: false,
                autoClose: 1000,
                position: 'top-right'
            })
        }

    }

    const handleTodoDone = async (e) => {
        const todo_id = e.target.id

        const res = await fetch('/api/v1/mark-todo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                todo_id
            })
        })

        const data = await res.json();
        setChanged(data)
    }

    return (
        <div className={value.isDone ? 'done singleTodo' : 'undone singleTodo'}>
            <div>
                <input type='checkbox' name='isDone' id={value._id} onChange={handleTodoDone} checked={value.isDone} />
                <p>{value.description}</p>
            </div>
            <Link onClick={deleteTodo} id={value._id}>
                <img src={deleteImg} id={value._id} alt='delete button' />
            </Link>

        </div>
    )
}

export default SingleTodo
