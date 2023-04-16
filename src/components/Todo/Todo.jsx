import React, { useState } from 'react'
import './Todo.css'
import axios from 'axios'

export default function Todo({ dataValue, id, todo, onUpdate, onDelete, minusCount }) {
    const [line, setLine] = useState([])

    const handleChecked = (e) => {
        onUpdate({...todo, status: e.target.checked ? 'completed' : 'active'});
      }
    const lineText = (e) => {
        if (todo.status === 'completed') {
          e.preventDefault();
          setLine(<label style={{ textDecoration: 'line-through'}}>{dataValue}</label>);
        } else if (todo.status === 'active') {
            e.preventDefault();
            setLine(dataValue);
        }};
    const newText = () => {
        if (todo.status === 'completed') {
          return line;
        } else {
          return dataValue
        }}
      const handleDelete = async (e) => {
        await onDelete(id);
        minusCount();
        console.log(id)

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
