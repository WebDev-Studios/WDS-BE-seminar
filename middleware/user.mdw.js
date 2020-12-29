const { isValidObjectId } = require("mongoose");

function validateUserData(req, res, next) {
    const { id ,name, birthday, username } = req.body;

    let err = [];

    if(id && !isValidObjectId(id)) {
        err.push({
            path: "id",
            message: "id khong hop le",
        })
    }
    if(name && (name.length <= 5 || name.length >= 100)) {
        err.push({
            path: "name",
            message: "Ten phai lon hon 5 ky tu hoac nho hon 100 ky tu",
        })
    }
    if(birthday && isNaN(new Date(birthday))) {
        err.push({
            path: "birthday",
            message: "Ngay thang nam sinh khong hop le",
        })
    }
    if(username && (username.length <= 5 || username.length >= 100)) {
        err.push({
            path: "username",
            message: "Username khong hop le",
        })
    }

    if (err.length !== 0) {
        res.status(404).json(err);
        return;
    }
    
    next();
}

module.exports = {
    validateUserData,
}