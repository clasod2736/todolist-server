import React, { useState } from 'react'
import './AddTodo.css'
import axios from 'axios';

export default function AddTodo({onAdd}) {
  const [text, setText] = useState('')
  
  const handleInput = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    if (text.trim().length === 0) {
      e.preventDefault();
      alert('PLEASE PUT TEXT ONLY!!')
      setText('');
    } else {
      e.preventDefault();
      
      const newTodoResponse = await axios.post('http://localhost:8080/insert', {
        "job" : text
      })
      //응답이 이 함수안으로 들어왔으니 아이디만 따로 변수로 할당해준다.
      const NewTodoId = newTodoResponse.data.newTodoId
      console.log(NewTodoId);
      onAdd({id: NewTodoId , job: text, status: 'active'});
      setText('');
    }}

  return (
    <form
    onSubmit={handleSubmit}
    >
      <input
      type="text"
      placeholder='Add Todos!!'
      className='todoInput'
      value={text}
      onChange={handleInput}
      />
      <button className='submitBtn'
      >+</button>
    </form>
  )
}

