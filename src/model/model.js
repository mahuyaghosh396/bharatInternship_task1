const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
    },

  phone :{
    type: Number,
    required: true,
  },
  email : {
    type : String,
    unique : true,
    required : true,
  },

  password : {
    type: String,
    required: true,
  },
  


});
const empCollection = new mongoose.model('empcollection',empSchema);
module.exports = empCollection;