const mongoose=require("mongoose");
var mongoURL='mongodb+srv://nandinisharmacs20:nandinitani123@cluster0.y1dxhaz.mongodb.net/mern-rooms'

mongoose.connect(mongoURL , {useUnifiedTopology:true, useNewUrlParser:true})

var connection=mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB Connection Failed')

})

connection.on('connected',()=>{
    console.log('Mongo DB Connection Successful')

})
module.exports=mongoose