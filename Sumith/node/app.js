const express = require('express');//importing to use them
const mysql = require('mysql');//importing to use them
const cors = require("cors");
const { response } = require('express');

//create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'lowt1'
 } );

 //connect 
 db.connect((err) => {
if(err){
    throw err;
    console.log(err);
}

 console.log('MySql Connected...');
 });


const app = express();// creating an express server

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors({ origin: true }));
const config = { 
    origin : '*',
    'Access-Control-Allow-Origin'  : '*' ,
    'Access-Control-Allow-Headers' : 'Content-Type' ,
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS' ,
    optionsSuccessStatus: 200 
    }
//connection code
app.post('/getdetails', express.json() ,cors({ origin: true , optionsSuccessStatus: 200  }), (req , res) => {
    console.log(req.body);
    const d = req.body.date 
    const e = req.body.firstname
    const f = req.body.lastname
    const a = req.body.order_detail_id
    //const b = req.body.tracking_number 
    const c = req.body.device_serial_number
    req.body.map(record => console.log("record in log " , record.Order_detail_id));
    let records = [];
    //req.body.map(record => records.push([record.Date, record.Firstname, record.Lastname,parseInt(record.Order_detail_id), record.Tracking_number,record.Device_serial_number]));
    req.body.map(record => records.push([record.Date, record.Firstname, record.Lastname,parseInt(record.Order_detail_id),record.Device_serial_number]));
    console.log("records", records);
    //db.query(`INSERT INTO qrscan (date, firstname, lastname, order_detail_id,tracking_number,device_serial_number ) VALUES ?`,[records],(err,result) =>{
        db.query(`INSERT INTO qrscan (date, firstname, lastname, order_detail_id,device_serial_number ) VALUES ?`,[records],(err,result) =>{
        if(err){
            throw err;
        }
        console.log(err);
        console.log(result);
        res.status(200).send(result);
    });
    }) 
            //calander code
        app.post('/getdata', cors({ origin: true , optionsSuccessStatus: 200  }), (req , res) => {
            console.log("selected date = " , req.body.date);
            console.log(typeof(req.body.date));
            let r = req.body.date;
            let q = `SELECT * FROM qrscan  where date = '${r}'`;
            console.log("query = " , q);
            db.query(q ,(err,result) => {
                    if(err){
                        console.log("This is error ");
                        throw err;
                    }
                    console.log("final result = " , result);
                    res.send(result);
            })
             })
             //update code
            app.put('/update', (req,res) =>{
                const order_detail_id = req.body.order_detail_id
                //const tracking_number = req.body.tracking_number
                const device_serial_number = req.body.device_serial_number
                db.query("UPDATE qrscan SET  device_serial_number = ? WHERE order_detail_id = ?",
                    [ device_serial_number , order_detail_id ],
                    (err,result)=>{
                        console.log(device_serial_number);
                        console.log( order_detail_id);
                    if(err){
                        console.log(err);
                        
                    }else{
                        res.send(result);
                    }
                });
            });

app.listen(3002  ,  ()  => {
    console.log('Server started on port 3002');
}); //start the server




