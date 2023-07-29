const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const {serviceAccount} = require('./Config');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const add_data = async () =>{
    const citiesRef = db.collection('users');
    await citiesRef.set({ user_id: "", email: 'test@gmail.com', profile_pic: '' });
}

const get_data = async () =>{
    const cityRef = db.collection('cities').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log('Document data:', doc.data());
    }
}

// get_data()