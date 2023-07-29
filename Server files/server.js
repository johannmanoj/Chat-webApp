const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
const firebase = require('./Firebase')






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
        var response = await firebase.add_data("users",email,data)
        console.log("response", response);
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/get-user-list', async (req,res) =>{
    try {
        var response = await firebase.get_data()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})





const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log('Server is running on PORT 8080');
})