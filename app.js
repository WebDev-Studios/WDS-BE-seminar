// Khai bao modules can su dung
const express = require('express');
const logger = require('morgan');
const env = require('dotenv')

const dbConnect = require('./config/db-connect');
const { validateUserData } = require('./middleware/user.mdw');
const { GetAllUser, FindUser, AddUser, UpdateUserById, DeleteUserById } = require('./service/user.service');

// Khoi tao bien server bang express
const server = express();

// Doc va load bien moi truong
env.config();

// Tao ket noi toi Database
dbConnect.connect();

// Parse request body sang dang JSON - dung khi client gui
// du lieu cho server
server.use(express.json());

// Logger
server.use(logger('dev'));

// Lay tat ca user trong db
server.get('/user', async function (req, res, next) {
    try {
        const users = await GetAllUser();

        res.send(users);
    } catch(err) {
        next(err);
    }
}) 

// tim kiem user
server.get('/user/find', async function (req, res, next) {
    try {
        const found = await FindUser(req.query);

        res.send(found);
    } catch(err) {
        next(err);
    }
})

// Them user
server.post('/user', validateUserData, async function (req, res, next) {
    try {
        const found = await FindUser({ username: req.body.username });
        if(found.length === 1) {
            res.status(404).json({message: `User voi username: "${req.body.username}" da ton tai"`});
            return;
        }

        const user = await AddUser(req.body);

        res.status(200).json({message: `Them user voi username: ${user.username} thanh cong`});
    } catch(err) {
        next(err);
    }
})

server.delete('/user/:id', validateUserData, async function (req, res, next) {
    try {
        const { id } = req.params;

        const deleted = await DeleteUserById(id);
        if(deleted === null) {
            res.status(404).json({message: `Khong tim thay user voi id: ${id}`});
            return;
        }

        res.status(200).json({message: `Xoa user voi id: ${deleted} thanh cong`});
    } catch(err) {
        next(err);
    }
})

server.put('/user/:id', validateUserData, async function (req, res, next) {
    try {
        const { id } = req.params;

        const updated = await UpdateUserById(id, req.body);
        if(updated === null) {
            res.status(404).json({message: `Khong tim thay user voi id: ${id}`});
            return;
        }

        res.status(200).json(updated);
    } catch(err) {
        next(err);
    }
})

/**
 * -------------- ERROR HANDLER ----------------
 */

// Catch 404 and forward to error handler
server.use(function (req, res, next) {
    res.status(404).json({ message: "Path not found"});
});

// Error handler
server.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
});

// API lang nghe tren port 8080
server.listen(8080, () => {
    console.log("Server lang nghe tren port 8080");
});