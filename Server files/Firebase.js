const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const {serviceAccount} = require('./Config');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const add_data2 = async (tableName, id, data) =>{
  const citiesRef = db.collection(tableName);
  var log_res = await citiesRef.doc(id).set(data);
  return log_res  
}

const add_data = async (tableName, data) =>{
  var curr_date = new Date
  data["created"] = curr_date.getTime()
  const citiesRef = db.collection(tableName);
  var log_res = await citiesRef.add(data);
  return log_res  
}

const get_data = async () =>{
  var data = []
  const citiesRef = db.collection('users');
  const snapshot = await citiesRef.get();
  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    data.push(doc.data())
  });
  return data
}

const get_user_messages = async (email) =>{
  const messages = []
  const citiesRef = db.collection('messages');
  const snapshot = await citiesRef.where('contact_email', '==', email).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    messages.push({
      "user_email": "johann.perfit@gmail.com",
      "created": "",
      "type": "internal",
      "message": "No Messages",
      "contact_email": ""
  })
    return messages;
  }  

  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    messages.push(doc.data())
  });
  // console.log("messages", messages);
  return messages
}

// add_data('messages', { 
//   "user_email": "johann.perfit@gmail.com", 
//   "contact_email": 'clint@gmail.com', 
//   "type" :"internal", 
//   "message" : "c5"
// })

// add_data('messages', { "user_id": "", "email": 'clint@gmail.com', "type" :"internal", "message" : "20"})
// add_data('messages', { "user_id": "", "email": 'clint@gmail.com', "type" :"external", "message" : "30"})
// add_data('messages', { "user_id": "", "email": 'clint@gmail.com', "type" :"external", "message" : "40"})
// add_data('messages', { "user_id": "", "email": 'clint@gmail.com', "type" :"internal", "message" : "50"})




module.exports = {add_data, get_data, get_user_messages}