const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/management"

mongoose.connect(db_url,function(error,db){
    if(error){
        console.log("数据库连接失败")
    }else{
        console.log("数据库连接成功")
    }
})

const Schema = mongoose.Schema

const SchemaObj = {
    user:{
        username:{required:true,type:String},
        password:{required:true,type:String},
        phone:{required:true,type:Number}
    },
    register:{
        chat:{requird:true,type:String}
    }   
}

for(var item in SchemaObj){
    mongoose.model(item,new Schema(SchemaObj[item]))
}


module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}

