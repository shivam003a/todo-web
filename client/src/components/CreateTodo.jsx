import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const CreateTodo = () => {

    const [description, setDescription] = useState("");
    const { setChanged } = useContext(AppContext)

    const handleTodo = (e) => {
        setDescription(e.target.value)
    }

    const handleTodoSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/v1/create-todo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description
            })
        })
        const data = await res.json();
        setChanged(data)

        if (res.status === 201) {
            toast.success("Todo Created", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
        }
        else {
            toast.error("Some Error Occurred", {
                draggable: false,
                autoClose: 1000,
                position: 'bottom-right'
            })
        }
    }
    return (
        <form method='POST' className='newTodoContainer'>
            <input type='text' name='description' placeholder='enter todo'
                onChange={handleTodo} value={description} />
            <button onClick={handleTodoSubmit}>Submit</button>
        </form>
    )
}

export default CreateTodo
