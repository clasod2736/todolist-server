import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import ResetBtn from '../ResetBtn/ResetBtn'
import './Todolist.css'
import axios from 'axios'

export default function Todolist() {
  const [datas, setDatas] = useState([]);
  // const [data, setData] = useState()
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  // const loadAllPost = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:8080/loadAllPost')
  //     const allPosts = res.data
  //     const postList = allPosts.map((item) =>  {
  //       return(
  //         <li
  //         key={item.id}
  //         value={item.job}
  //         >
  //         </li>
  //       )
  //     })
  //     setDatas(postList)
  //     console.log(postList)
  //     console.log(datas)
  // }
  //   catch (err) { console.log(err) }
  // }

  useEffect(() => {
    axios.get('http://localhost:8080/loadAllPost')
    .then((response) => {
      setDatas(response.data)
    })
  }, []);

  console.log(datas)

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

  datas.forEach(value => (datas[value.id] = value));  

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
          {datas.map((item) => (console.log(item)))}
           {datas.map((item) => (
            <Todo
            key={item._id}
            id={item._id}
            todo={item}
            todoJob={item.job}
            status={'active' || 'completed'}
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