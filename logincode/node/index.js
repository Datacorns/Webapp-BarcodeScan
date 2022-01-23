const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;


const app = express();

app.use(express.json());
app.use(cors());

//create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'lowt1'
 });

 //create route
 app.post("/register", (req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    //console.log("req" ,req);
    console.log("res",res);


    bcrypt.hash(password,saltRounds,(err,hash)=>{

        if(err){
            //console.log("line is 35",err)
        }
        db.query (
            "INSERT INTO usercredentials(firstname, lastname, username,password) VALUES (?,?,?,?)",
            [firstname, lastname,username,hash],
            (err,result) =>{
                 //console.log("line is 41" ,err);
            }
        );
    })
    
});
        
app.post("/login", (req,res) =>{
    const firstname = req.body.firstname;
    const username = req.body.username;
    const password = req.body.password;

    db.query (
        "SELECT *  FROM usercredentials WHERE username =? ;",
        username,
        (err,result) =>{
            if(err){
            res.send({err: err});
            }
                if (result.length > 0){
                    bcrypt.compare(password, result[0].password,(error,response)=>{
                        if(response) {
                            console.log("result is",result);
                            console.log("response is",response);          
                            res.send(result)
                        } else{
                            res.status(200).send({message:"wrong password combo"});
                            console.log("response is",response);
                        }                 
                       })
                } else{
                    res.send({message:"User doesnt exist"});
                }
            }
    );
});


 app.listen(5003 , ()=>{
    console.log('Login Server started 5003 ....');
});