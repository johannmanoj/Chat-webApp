const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const firebase = require('./Firebase')

const message_db = require('./queries/messages')
const contact_db = require('./queries/contacts')
const user_db = require('./queries/user')
const contact = require('./functions/contacts')
const user = require('./functions/user')

app.get('/', async (req,res) =>{
    res.send("Hello World")
})


app.post('/log-message', async (req,res) =>{
    try {
        const {user_email, contact_email, message} = req.body
        var response = await message_db.log_message(user_email, contact_email, message)
        console.log("response", response);

        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-messages', async (req,res) =>{
    try {
        console.log("message api called"), req.body;
        const {user_email, contact_email} = req.body
        var response = await message_db.get_user_contact_messages(user_email, contact_email)
       
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/log-contact', async (req,res) =>{
    try {
        console.log("log api caaaaaaaaa");
        const {user, email} = req.body
        var response = await contact.add_new_contact(user, email)
       
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-contacts', async (req,res) =>{
    try {
        const {user} = req.body
        var response = await contact_db.get_user_contacts(user)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-data', async (req,res) =>{
    try {
        const {email} = req.body
        var response = await user_db.get_user_info(email)
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


app.post('/log-user', async (req,res) =>{
    try {
        const {email, firstName, lastName, profilePic} = req.body
        var response = await user.check_log_or_update_user(email, firstName, lastName, profilePic)
        
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/clear-contact-messages', async (req,res) =>{
    try {
        console.log("clear message api called");
        const {user_email, contact_email} = req.body
        var response = await message_db.delete_contact_messages(user_email, contact_email)
        
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/delete-contact', async (req,res) =>{
    try {
        console.log("clear message api called");
        const {user_email, contact_email} = req.body
        var response = await contact_db.delete_contact(user_email, contact_email)
        await message_db.delete_contact_messages(user_email, contact_email)
        
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})









// app.get('/get-user-list', async (req,res) =>{
//     try {
//         var response = await firebase.get_data()
//         res.status(200).send(response)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })








const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log('Server is running on PORT 8080');
})