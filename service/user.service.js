const { isValidObjectId } = require('mongoose');
const UserSchema = require('../models/user');

async function GetAllUser() {
    const users = await UserSchema.find();

    return users;
}

async function FindUser(query) {
    const found = await UserSchema.find(query);

    return found;
} 

async function AddUser(data) {
    const user = new UserSchema(data);

    await user.save();

    return user;
}

async function UpdateUserById(id, data) {
    const updated = await UserSchema.findOneAndUpdate({
        _id: id,
    }, data, {
        new: true, 
    });

    return updated;
}

async function DeleteUserById(id) {
    const deleted = await UserSchema.findByIdAndDelete(id);

    return deleted;
}

module.exports = {
    GetAllUser,
    FindUser,
    AddUser,
    UpdateUserById,
    DeleteUserById,
}