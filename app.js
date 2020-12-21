// Khai bao modules can su dung
const express = require('express');

// Khoi tao bien server bang express
const server = express();

// Parse request body sang dang JSON - dung khi client gui
// du lieu cho server
server.use(express.json())

// Get request - Lay du lieu
server.get('/hello', (req, res) => {
    // Response ket qua "Hello"
    res.json({
        message: "Hello",
    })
})

// Post resquest - Them du lieu
server.post('/', (req, res) => {
    // Lay ten client gui len gan vao bien name
    const name = req.body.name;

    // Luu du lieu vao database

    res.json({
        message: "ok",
        name: name,
    })
})

// API lang nghe tren port 8080
server.listen(8080);