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




const check_and_log_user = async (email, data) =>{
  var email_check_res = await check_user_email(email)   
  if(email_check_res.length == 0){
    console.log("email not found");
    var add_res = await log_user_data(email, data)
    return add_res
  } 
   
}


const log_user_data = async (email, data) =>{
  var curr_date = new Date
  data["created"] = curr_date.getTime()
  data["time_stamp"] = await date_formatting(curr_date.getTime())
  const tableRef = db.collection("users");
  var log_res = await tableRef.doc(email).set(data);
  return log_res  
}

const add_contact = async (user, email) =>{
  var user_data = await check_user_email(email)
  console.log(user_data);

  if(user_data.length > 0){
    var curr_date = new Date
    var req_data = {
      "created":curr_date.getTime(),
      "time_stamp":await date_formatting(curr_date.getTime()),
      "user":user,
      "contact_email":user_data[0]["email"],
      "firstName":user_data[0]["firstName"],
      "lastName":user_data[0]["lastName"],
      "profilePic":user_data[0]["profilePic"]
    }
   
    const tableRef = db.collection("contacts");
    var log_res = await tableRef.add(req_data);

    return {statuscode:200, "data":log_res}
  }
  
  return {"statuscode":201, "data":"user not found"}  
}

const get_contacts_list = async (email) =>{
  const contacts = []
  const tableRef = db.collection('contacts');
  const snapshot = await tableRef.where('user', '==', email).get();
  snapshot.forEach(doc => {
    contacts.push(doc.data())
  });

  // console.log("contacts", contacts);
  return contacts
}

const add_data = async (tableName, data) =>{
  var curr_date = new Date
  data["created"] = curr_date.getTime()
  data["time_stamp"] = await date_formatting(curr_date.getTime())
  const tableRef = db.collection(tableName);
  var log_res = await tableRef.add(data);
  return log_res  
}

const check_user_email = async (email) =>{
  var data = []
  const tableRef = db.collection('users');
  const snapshot = await tableRef.where('email', '==', email).get();
  snapshot.forEach(doc => {
    data.push(doc.data())
  });
  console.log("data---",data);
  return data
}




const get_data = async () =>{
  var data = []
  const tableRef = db.collection('users');
  const snapshot = await tableRef.get();
  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    data.push(doc.data())
  });
  return data
}


const get_user_messages = async (email) =>{
  const messages = []
  const tableRef = db.collection('messages');
  const snapshot = await tableRef.where('contact_email', '==', email).orderBy('created','asc').get();
  snapshot.forEach(doc => {
    messages.push(doc.data())
  });

  // console.log("messages", messages);
  return messages
}

const get_user_data = async (email) =>{
  const user = []
  const tableRef = db.collection('users');
  const snapshot = await tableRef.where('email', '==', email).get();
  snapshot.forEach(doc => {
    user.push(doc.data())
  });

  if(user.length == 0){user.push({
    firstName: '',
    lastName: '',
    user_id: '',
    email: '',
    profilePic: ''
  })}

  // console.log("user", user);
  return user
}



module.exports = {add_data, get_data, get_user_messages, check_and_log_user, get_user_data, add_contact, get_contacts_list, check_user_email}