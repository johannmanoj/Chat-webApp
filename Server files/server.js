const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));






// app.post('/create', async (req,res) =>{
//     try {
//         const {email, firstName, lastName} = req.body
//         const id = email;
//         const userjson = {
//             email:email,
//             firstName:firstName,
//             lastName:lastName
//         }
//         const response = await db.collection("users").doc(id).add(userjson)
//         res.send(response)
//     } catch (error) {
//         res.send(error)
//     }
// })





const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log('Server is running on PORT 8080');
})