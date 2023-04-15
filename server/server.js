const express = require('express');
const app = express();
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

//각 객체의 오브젝트아이디를 데이터베이스에서 불러와 프론트엔드로 보내주기
// app.get('/saveID', async (req, res) => {
//     const data = await MyTodoList.findOne({
//         "job": req.data
//     })
//     res.send(data)
//     console.log(req.job)
// })

//데이터 베이스에있는 리스트 전부 불러오기.
app.get('/loadAllPost', async function (req, res) {
    const data = await MyTodoList.find({});
    res.send(data);
    console.log(data.length)
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
        console.log('output', output);
        res.status(200).json({'newTodoId': outputId});
        
    } catch (error) {
        console.log(error);
         res.send("didn't work?")
    }
})
// DElETE 삭제 API
app.delete('/deleteOne', async function (req, res) {
    try {
        const todoJob = req.body.id;

        await MyTodoList.deleteOne(
            { "_id": todoJob }
        );
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
})