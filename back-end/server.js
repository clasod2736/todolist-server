const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path');
const bodyParser = require("body-parser")
const cors = require('cors');
const connectDB = require('./database.js')
const MyTodoList = require('./model.js');
const port = process.env.port || 8080;

connectDB();

app.use(bodyParser.json())

app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
    console.log('server opend.')
})

//처음 화면불러오기.
app.get('/', (res, req) => {
    req.sendFile(path.join(__dirname, '../build/index.html'));
  })

//데이터 베이스에있는 리스트 전부 불러오기.
app.get('/loadAllPost', async function (req, res) {
    const data = await MyTodoList.find({});
    try {
    res.send(data);
    console.log("All Posts are loaded.")
    } catch (err) {
        res.sendStatus(400);
    }
  })

// POST 크리에이트 API
// 리스트를 생성하면서 동시에 생성되는 데이터의 아이디만 따로 프론트로 보내준다.
// 프론트에서 API를 두번 호출하는 것보다 더욱 효과적.
app.post('/insert', async function (req, res) {

    const todoJob = req.body.job;
    
    try {
     const newTodo = new MyTodoList({
         job: todoJob
     });
        let output = await newTodo.save();
        let outputId = output._id
        console.log('created', output);
        res.status(200).json({'newTodoId': outputId});
        
    } catch (error) {
        console.log(error);
         res.send("didn't work?")
    }
})

// DElETE 개별삭제 API
app.delete('/deleteOne', async function (req, res) {
    try {
        const todoId = req.body.id;
        const todoJob = req.body.job;

        await MyTodoList.deleteOne(
            { "_id": todoId }
        );
        res.sendStatus(200)
        console.log('deleted:', todoJob )
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
})

// Reset 초기화(리스트를 전부다 삭제하는) API
app.delete('/resetAll', async function (req, res) {
    try {

        await MyTodoList.deleteMany({});
        res.sendStatus(200);
        console.log("Reset!!")
    }   catch (error) {
            res.sendStatus(400);
            console.log(error)
    }
})