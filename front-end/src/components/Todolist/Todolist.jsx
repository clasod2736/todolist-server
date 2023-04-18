import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import Todo from '../Todo/Todo'
import ResetBtn from '../ResetBtn/ResetBtn'
import './Todolist.css'
import axios from 'axios'

export default function Todolist() {
  const [count, setCount] = useState(0);
  const [datas, setDatas] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/loadAllPost')
      .then((response) => {
        console.log(response.data)
        setDatas(response.data)
        setCount(response.data.length)
      });
    }, []);

  const handleAdd = (data) => setDatas([...datas, data]);
  const handleUpdate = (updated) =>
    setDatas(datas.map((t) => (t.job === updated.job ? updated : t)));
  const handleDelete = (deleted) =>
    setDatas(datas.filter((t) => t !== deleted));
  const handleReset = async () => {
    
    // 리셋 API 요청
    try{
    await axios.delete('http://localhost:8080/resetAll', {})
    } catch (err) {
      console.log(err)
    }
    setDatas(datas.filter((t) => t.id === 0));
    resetCounter();}

  const plusCounter = () => setCount(datas.length + 1);
  const minusCounter = () => setCount(datas.length - 1);
  const resetCounter = () => setCount(0);

  return (
    <div className='todoBox' onSubmit={plusCounter}>
      <p className='counter'>
        Total Counter: {count}
      </p>
      <ResetBtn
      onReset={handleReset}
      />
      <AddTodo
      onAdd={handleAdd}
      />
        <ul className='todos'>
           {datas.map((item) => (
            <Todo
            key={item.id}
            id={item._id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            minusCount={minusCounter}
            />
          ))}
        </ul>
    </div>
  )
}