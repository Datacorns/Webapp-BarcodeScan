    import React, { useState } from 'react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import Container  from '@material-ui/core/Container';
    import  TextField from '@material-ui/core/TextField';
    import Button from '@material-ui/core/Button';
    import IconButton from '@material-ui/core/IconButton';
    import RemoveIcon from '@material-ui/icons/Remove';
    import AddIcon from '@material-ui/icons/Add';
    import Icon from '@material-ui/core/Icon'; 
    import Axios from 'axios';
    import './App.css';
    //import './styles.js';
    //import styled from 'styled-components';
    import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
    import axios from 'axios';
    import { useScrollTrigger } from '@material-ui/core';

    const useStyles = makeStyles((theme) => ({
      root : {
        '& .MuiTextField-root' : {
          margin : theme.spacing(3),
        },
      },
      button : {
        margin : theme.spacing(1),
      }
    }))
    function App(){
      const [selectedDate, setSelectedDate] = useState(null);
      const classes = useStyles()
      const [inputFields , setInputFields] = useState([
        //{Date: '', Firstname: '' , Lastname: '', Order_detail_id: '' , Tracking_number:'' , Device_serial_number: '' },
        {Date: '', Firstname: '' , Lastname: '', Order_detail_id: '' , Device_serial_number: '' },//number of objs to add ie fields
      ]);


      const [Status, setStatus] = useState('');
      const [UpdatedValue, setUpdatedValue] = useState([]);//my
      const [NewTrack,setNewTrack ] = useState('');
      const [NewDevice ,setNewDevice] = useState('');
        //connection code
      
        const getdetails = (e) =>{
        let date = inputFields[0].Date;
        let firstname = inputFields[0].Firstname;
        let lastname = inputFields[0].Lastname;
        let order_detail_id = inputFields[0].Order_detail_id;
       // let tracking_number =inputFields[0].Tracking_number;
        let device_serial_number =inputFields[0].Device_serial_number;
        
        console.log('formvalues',inputFields[0]  , e);
        console.log(Date);
      
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
          }
        };
        
        Axios({
           method: 'post',
           url: 'http://localhost:3002/getdetails',
          data:[
             ...inputFields
         ],
           headers : {'Content-Type': 'application/json'},
         }).then((result , err) => 
          {if(result.status == 200){
            setStatus("Data Added");
          }
        else if(err){
          setStatus("Error Occurred");
        }});};


          //calander code
          const getdata = (e) =>{
            var str = selectedDate ;
            var date = new Date(str);
            var day = date.getDate(); //Date of the month: 2 in our example 
            if(day < 10 ){
              day = "0" + day ;}
            var month = date.getMonth() + 1; //Month of the Year: 0-based index, so 1 in our example
            if(month < 10 ){
                month = "0" + month ;}
            var year = date.getFullYear()
            let mydate = ""+year + "-" +month + "-" +day;
            mydate= JSON.parse(JSON.stringify(mydate));
            let axiosConfig = {
              headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
              }
            };
            
            Axios({
               method: 'post',
               url: 'http://localhost:3002/getdata',
              data: {'date' : mydate},
             }).then((result , err) => 
              {if(result.status == 200){
                setUpdatedValue(result.data);//my
                console.log(result.data);
                console.log(result);
                setUpdatedValue(result.data);
              }
            
          });
              
           };
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log("InputFields" , inputFields);
          console.log(e);
        };

      const handleChangeInput = (index,event) =>{
        const values =[...inputFields];
        values[index][event.target.name] = event.target.value;
        console.log("val",values);
        setInputFields(values);
      }
      const [counter , updateCounter]= useState(0);

      const handleRemoveFields = (index)=>{
        updateCounter(counter - 1);
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
        }

      const handleAddFields = ()=>{
        updateCounter(counter + 1);
      //   setInputFields([...inputFields, {Date:'',Firstname:'', Lastname:'',Order_detail_id: '' , Tracking_number:'' , Device_serial_number: '' }])
         setInputFields([...inputFields, {Date:'',Firstname:'', Lastname:'',Order_detail_id: '', Device_serial_number: '' }])
       }
      

      const updateNewTrack=(value) =>{
        console.log("latest value" , value);
        Axios.put("http://localhost:3002/update", 
        ({
          // tracking_number : NewTrack , 
           device_serial_number : NewDevice, 
           order_detail_id : value.order_detail_id, 
        })).then((response)=>{
          alert("updated");
          
        })
      }


      return ( 
        
        <Container>
          <div className= 'first'>
          <h1 className="tab"><b><center>WatchPat Patient Details</center></b></h1>
          <form className = {classes.root} onSubmit = {handleSubmit}>
            <div className = "abar">
            <h2 className="tabb"> Calander </h2>
              <DatePicker 
                  selected = {selectedDate} 
                  onChange={date => setSelectedDate(date)}
                  dateFormat = 'yyyy/MM/dd'
                  isClearable 
                  showYearDropdown
                  scrollableMonthYearDropdown
                  /> 
              <Button 
                 className = {classes.button}
                  variant = "contained" 
                  color = "secondary" 
                  type = "submit" 
                  onClick ={selectedDate => getdata(selectedDate)}
                >
                  Select</Button>
          
            </div>
            <hr></hr>
            {/* <h1> Add New Patient</h1>
          {inputFields.map((inputField,index) => (
            <div className = "bar"  key ={index}>
              
              <TextField 
                name = "Date"
                label = "Date"
                variant = "filled"
                value = {inputField.date}
                onChange = {event => handleChangeInput (index,event)}
              />

              <TextField 
                name = "Firstname"
                label = "Firstname"
                variant = "filled"
                value = {inputField.Firstname}
                onChange = {event => handleChangeInput (index,event)}
              />

              <TextField 
                name = "Lastname"
                label = "Lastname"
                variant = "filled"
                value = {inputField.Lastname}
                onChange = {event => handleChangeInput (index,event)}
              />
          
              <TextField 
                name = "Order_detail_id"
                label = "Chart Number"
                variant = "filled"
                value = {inputField.Order_detail_id}
                onChange = {event => handleChangeInput (index,event)}
              />

              {/* <TextField 
                name = "Tracking_number"
                label = "Tracking_number"
                variant = "filled"
                value = {inputField.Tracking_number}
                onChange = {event => handleChangeInput (index,event)}
              /> */}

              {/* <TextField 
                name = "Device_serial_number"
                label = "Device_serial_number"
                variant = "filled"
                value = {inputField.Device_serial_number}
                onChange = {event => handleChangeInput(index,event)}
              />
              
              {counter >0 && (<IconButton
              onClick = { () => handleRemoveFields(index)}
              >
                <RemoveIcon />
              </IconButton>)}

            </div>
          ))}
              <IconButton
                onClick = { () => handleAddFields()}
                >
                <AddIcon />
              </IconButton>

          <Button 
          className = {classes.button}
          variant = "contained" 
          color = "secondary" 
          type = "submit" 
          onClick ={getdetails} //getdetails
          endIcon = {
          <Icon>send</Icon>
          }>
            Send</Button> */} 
            
          </form>
          
          <h1 classsName = "edit"> Edit Patient Details</h1>
          {UpdatedValue.map((value,key)=>{
            return <div className="table">
              
              <h3>{`Date :  ${new Date(value.date).toLocaleDateString()}`}</h3>
              <h3>First Name : {value.firstname}</h3>
              <h3>Last Name : {value.lastname}</h3>
              <h3>Chart Number : {value.order_detail_id}
              </h3>
              {/* <h3>Tracking Number : {value.tracking_number}
              <input type = "text"
              onChange = {(event) =>{
                setNewTrack(event.target.value);
              }} />
              </h3> */}
              <h3>Device Serial Number : {value.device_serial_number}
              <input type = "text" 
              onChange = {(event) =>{
                setNewDevice(event.target.value);
              }}  />
              </h3>
              <button onClick ={() => updateNewTrack(value)
              }><center>Update</center></button>
            </div>
          })}
          <hr/>
          </div>
          {/* 
          <h1>{Status}</h1> */}

        </Container>
      ); 
    }
      export default App;
  