const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    address: String,
    city: String
})
const UserModel = mongoose.model('orders', UserSchema);
module.exports = UserModel;