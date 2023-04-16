import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function LoadTodos() {
    const [datas, setDatas] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/loadAllPost')
        .then((response) => {
          console.log(response.data)
          setDatas(response.data)
          setCount(response.data.length)
        })
        console.log(count)
      }, []);

  return (
    <></>
  )

}
