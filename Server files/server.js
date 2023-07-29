const express = require("express");
const app = express();
const admin = require("firebase-admin")
const {credentials} = require("./Config")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.post('/create', async ())

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log('Server is running on PORT 8080');
})