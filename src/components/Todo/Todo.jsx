import React, { useState } from 'react'
import './Todo.css'
import axios from 'axios'

export default function Todo({ id, todo, onUpdate, onDelete, minusCount }) {
    const [line, setLine] = useState([])

    const handleChecked = (e) => {
        onUpdate({...todo, status: e.target.checked ? 'completed' : 'active'});
      }
    const lineText = (e) => {
        if (todo.status === 'completed') {
          setLine(<label style={{ textDecoration: 'line-through'}}>{todo.job}</label>);
          e.preventDefault();
        } else if (todo.status === 'active') {
            e.preventDefault();
            setLine(todo.job);
        }};
    const newText = () => {
        if (todo.status === 'completed') {
          return line;
        } else {
          return todo.job
        }}
      const handleDelete = async (e) => {
        onDelete(todo);

        await axios.delete ('http://localhost:8080/deleteOne', {
          data: {
          "id": id
        }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        e.preventDefault();
        minusCount();
      }

    return (
        <li key={id}>
            <input 
            type='checkbox'
            id='checkbox'
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
