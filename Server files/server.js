const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const firebase = require('./Firebase')


app.get('/', async (req,res) =>{
    res.send("Hello World")
})



app.post('/log-message', async (req,res) =>{
    try {
        const {user_email, contact_email, message, type} = req.body
        console.log("data-----",user_email, contact_email, message, type);
        var data = { 
            "user_email": user_email, 
            "contact_email": contact_email, 
            "message" :message, 
            "type" : type, 
        }
        var response = await firebase.add_data("messages",data)
        // console.log("response", response);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/log-user', async (req,res) =>{
    try {
        const {email, firstName, lastName, profilePic} = req.body
        var data = { 
            "user_id": "", 
            "email": email, 
            "firstName" :firstName, 
            "lastName" : lastName, 
            "profilePic": profilePic 
        }
        var response = await firebase.check_and_log_user(email,data)
        // console.log("response", response);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/log-contact', async (req,res) =>{
    try {
        console.log("log api caaaaaaaaa");
        const {user, email} = req.body
        var response = await firebase.add_contact(user, email)
       
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-contacts', async (req,res) =>{
    try {
        
        const {user} = req.body
        var response = await firebase.get_contacts_list(user)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-data', async (req,res) =>{
    try {
        const {email} = req.body
        var response = await firebase.get_user_data(email)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/get-user-list', async (req,res) =>{
    try {
        var response = await firebase.get_data()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-messages', async (req,res) =>{
    try {
        const {email} = req.body
        var response = await firebase.get_user_messages(email)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/email-search', async (req,res) =>{
    try {
        console.log("apicllll");
        const {email} = req.body
    
        var response = await firebase.check_user_email(email)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})





const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log('Server is running on PORT 8080');
})