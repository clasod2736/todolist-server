import React, { useState } from 'react'
import './Todo.css'
import axios from 'axios'

export default function Todo({ todoJob, id, todo, onUpdate, onDelete, minusCount }) {
    const [line, setLine] = useState([])
    console.log(todo)
    console.log(todoJob)
    const handleChecked = (e) => {
        onUpdate({...todo, status: e.target.checked ? 'completed' : 'active'});
      }
    const lineText = (e) => {
        if (todo.status === 'completed') {
          e.preventDefault();
          setLine(<label style={{ textDecoration: 'line-through'}}>{todoJob}</label>);
        } else if (todo.status === 'active') {
            e.preventDefault();
            setLine(todoJob);
        }};
    const newText = () => {
        if (todo.status === 'completed') {
          return line;
        } else {
          return todoJob
        }}
      const handleDelete = async (e) => {
        e.preventDefault();
        onDelete(todo);
        minusCount();
        console.log(id)

        await axios.delete ('http://localhost:8080/deleteOne', {
          data: {
          "_id": id
        }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    return (
        <li>
            <input 
            type='checkbox'
            id='checkbox'
            checked={todo.status === 'completed'}
            className='checkbox'
            onChange={handleChecked}
            onInputCapture={lineText}
            />
        <label htmlFor="checkbox">{newText()}</label>
        <button className='deleteBtn'
        onClick={handleDelete}
        >X</button>
        </li>
  )
}
