const mongoose = require("mongoose");
const keys = require("../config/keys");
console.log(keys.CONNECT_PASS);
const uri = `mongodb+srv://chalfari:${keys.CONNECT_PASS}@yitz.jupy6.mongodb.net/bankAPI?retryWrites=true&w=majority`;
mongoose.connect(uri, {});
