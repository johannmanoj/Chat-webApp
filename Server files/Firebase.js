const config = require('./Config')

const fs = require('firebase-admin');

// const serviceAccount = require('./path/to/key.json');

fs.initializeApp({
 credential: fs.credential.cert(config.serviceAccount)
});

const test = async () =>{
    const db = fs.firestore(); 

    const usersDb = db.collection('users'); 

    const liam = usersDb.doc('lragozzine'); 

    var res = await liam.set({
        first: 'Liam',
        last: 'Ragozzine',
        address: '133 5th St., San Francisco, CA',
        birthday: '05/13/1990',
        age: '30'
    });

    console.log("res", res);
}

// test()

