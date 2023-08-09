const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const {serviceAccount} = require('./Config');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const date_formatting = async (date) =>{
  var currentTime = new Date(parseInt(date));

  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   // IST offset UTC +5:30 
  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

  var hoursIST = ISTTime.getHours()
  var minutesIST = ISTTime.getMinutes()
  const year = ISTTime.getFullYear();
  const month = ISTTime.getMonth() + 1;
  const day = ISTTime.getDate();

  const req_date = [day, month, year ].join('/');


  console.log(req_date," ", hoursIST,":", minutesIST)
  return req_date + " " + hoursIST + ":" + minutesIST
}


const add_data = async (tableName, data) =>{
  var curr_date = new Date
  data["created"] = curr_date.getTime()
  data["time_stamp"] = await date_formatting(curr_date.getTime())
  const tableRef = db.collection(tableName);
  var log_res = await tableRef.add(data);
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
  const snapshot = await citiesRef.where('contact_email', '==', email).orderBy('created','asc').get();
  
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