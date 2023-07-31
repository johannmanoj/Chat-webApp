const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const {serviceAccount} = require('./Config');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const add_data = async (tableName, id, data) =>{
  const citiesRef = db.collection(tableName);
  var log_res = await citiesRef.doc(id).set(data);
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

// add_data('users', { "user_id": "2", "email": 'test2@gmail.com', "firstName" :"John", "lastName" : "Doe", "profilePic": '' })

module.exports = {add_data, get_data}