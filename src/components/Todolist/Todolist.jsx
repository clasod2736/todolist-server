import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import ResetBtn from '../ResetBtn/ResetBtn'
import './Todolist.css'
import axios from 'axios'

export default function Todolist() {
  const [datas, setDatas] = useState([]);
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/loadAllPost')
    .then((response) => {
      setDatas(response.data)
      setCount(datas.length)
    })
  }, [datas]);

  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.key === updated.key ? updated : t)));
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));
  const handleReset = () => {
    setTodos(todos.filter((t) => t.id === 0));
    resetCounter();}
  const plusCounter = () => setCount(todos.length + 1);
  const minusCounter = () => setCount(todos.length - 1);
  const resetCounter = () => setCount(0);

  return (
    <div className='todoBox'
    onSubmit={plusCounter}
    >
      <p className='counter'>Total Counter: {count}</p>
      <ResetBtn
      onReset={handleReset}
      />
      <AddTodo 
      onAdd={handleAdd}
      />
        <ul className='todos'>
           {datas.map((item) => (
            <Todo
            key={item._id}
            id={item._id}
            todo={item}
            dataValue={item.job}
            status={'active' || "completed"}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            minusCount={minusCounter}
            />
          ))}
          {/* {todos.map((todo) => (
            <Todo
            key={todo.key}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            minusCount={minusCounter}
            />
          ))} */}
        </ul>
    </div>
  )
}