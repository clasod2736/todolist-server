import React from 'react'
import './App.css'
import Todolist from './components/Todolist/Todolist'

export default function App() {
  return (
    <div className='body'>
      <Todolist/>
    </div>
  )
}


//get 구현, id 베이스로 다시 구현, delete API 다시 만들기
//데이터베이스에서 오브젝트아이디를 프론트엔드로 가져와서 같은 아이디로 API 구현하기.
//