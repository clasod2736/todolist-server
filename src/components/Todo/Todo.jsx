import React, { useState } from 'react'
import './Todo.css'
import axios from 'axios'

export default function Todo({ dataValue, id, todo, onUpdate, onDelete, minusCount }) {
    const [line, setLine] = useState([])

    const handleChecked = (e) => {
        onUpdate({...dataValue, status: e.target.checked ? 'completed' : 'active'});
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
        onDelete(id);
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
