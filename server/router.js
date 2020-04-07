const express = require("express");
const utils = require('utility');
const router = express.Router()
const model = require("./mode");
const User = model.getModel("user");
const filter = {password:0,__v:0}

router.get("/getUserInfo",function (req,res,next) {
    console.log("req.cookie",req.cookies)
    let userId = req.cookies.userId
    if(typeof userId == "undefined"){
        return res.send({
            code:1,
            body:{
                msg:"用户没有登录"
            }
        })
    }else{
        return res.send({
            code:0,
            body:{
                msg:"用户已经登录"
            }
        })
    }
})

router.post("/login",function(req,res,next){
    if(JSON.stringify(req.body) == "{}"){
        return res.send({
            code:1,
            body:{
                msg:"数据有误"
            }
        })
    }
    let {username,password} = req.body;
    User.findOne({username,password:pwdMD5(password)},filter,(err,doc)=>{
        if(err){

            return res.send({
                code:1,
                body:{
                    msg:"服务器有问题"
                }
            })
        }
        return res.send({
            code:0,
            body:{
                userId:doc._id,
                username:doc.username
            }
        })
    })
})


router.post("/register",function(req,res,next){
    if(JSON.stringify(req.body) == "{}"){
        return res.send({
            code:1,
            body:{
                msg:"数据有误"
            }
        })
    }
    let {username,password,phone} = req.body;
    User.findOne({username},(err,doc)=>{
        if(err) return res.send({
            code:1,
            body:{
                msg:"服务器有问题"
            }
        })
        if(doc){
            return res.send({
                code:1,
                body:{
                    msg:"此用户名已经存在"
                }
            })
        }
    })
    User.findOne({phone},(err,doc)=>{
        if(err) return res.send({
            code:1,
            body:{
                msg:"服务器有问题"
            }
        })
        if(doc){
            return res.send({
                code:1,
                body:{
                    msg:"此手机号已经注册过"
                }
            })
        }
    })

    User.create({username,password:pwdMD5(password),phone},(err,doc)=>{
        if(err){
            return res.send({
                code:1,
                body:{
                    msg:"服务器有问题"
                }
            })
        }
        res.cookie('userId', doc._id, { maxAge: 900000, httpOnly: true });
        return res.send({
            code:0,
            body:{
                userId:doc._id,
                username:doc.username,
                phone:doc.phone
            }
        })
    })

})


function pwdMD5(pwd){
    let salt = "xxd_management_@123SAAsfj&22xxbv/sd"
    return utils.md5(utils.md5(salt+pwd))
}

module.exports = router