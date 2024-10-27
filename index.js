const dotenv=require("dotenv");
dotenv.config({path:'./config.env'});
const cors=require("cors");
const express=require("express");
const path=require("path");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const index=express();
index.use(cors());
index.use(express.json());
let db=null;

const dbPath=path.join(__dirname,"users.db");

const port=process.env.port || 300


initiate=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        index.listen(port,()=>{
            console.log(`server Runnning at  ${port}`)
        })
    }
    catch(e){
        console.log(`DB error:${e.message}`);
        process.exit(1);
    }
}


initiate();

index.get("/get",async(request,response)=>{
    console.log("Its active while hittting")
    response.send("data trigggged")
})
