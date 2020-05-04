const express = require('express');

var app = new express()
app.post("/signup",(req,res,next)=>{
    console.log(req)
})

app.post("/login",(req,res,next)=>{
    console.log(req)
})

app.post("/addpost",(req,res,next)=>{
    console.log(req)
})

app.get("/getpost",(req,res,next)=>{
    console.log(req)
})

app.post("/deletepost",(req,res,next)=>{
    console.log(req)
})

app.use('/',(req,res,next)=>{
    res.status(404).write("<h1>Error: Page Not Found</h1>")
    return res.end()
})

app.listen(3000)