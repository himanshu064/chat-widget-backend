const express = require("express")
require("dotenv").config()
const app = express()
const http = require("http").createServer(app)
const port = process.env.PORT || 2000
const db = require("./db")
const {chat} = require("./chat")
const routes = require("./routes/user")
app.use(express.urlencoded())
app.use(express.json())

app.use("/",routes)


chat(http)
http.listen(port,()=>{
    console.log(`server listen on port ${port}`);
    
})