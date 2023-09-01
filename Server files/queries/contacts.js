const {QueryTypes} = require('sequelize');
const db = require('./index');


const log_new_contact = async (user, contact_email, firstName, lastName, profilePic) => {
    try {
        const result = await db.sequelize.query(
            `INSERT INTO chatapp.user_contacts (user, contact_email, firstName, lastName, profilePic) VALUES (?,?,?,?,?)`,
            {
                replacements: [user, contact_email, firstName, lastName, profilePic],
                type: QueryTypes.INSERT
            }
        );
        if(!result.length) {
            return {
                statusCode: 401,
                errorName: "Data not inserted",
                errorMsg: "Invalid input"
            }
        } else {
            return {
                statusCode: 200,
                data: result                
            }
        }
    } catch(err) {
        return {
            statusCode: 500,
            errorName: err.name,
            errorMsg: err.message
        }
    }
}


const get_user_contacts = async (user_email) => {
    try {
        const result = await db.sequelize.query(
            'SELECT * FROM chatapp.user_contacts WHERE user = ?',
            {
                replacements: [user_email],
                type: QueryTypes.SELECT
            }
        );
        // console.log(result)
        return {
            statusCode: 200,
            data: result               
        }
    } catch(err) {
        return {
            statusCode: 500,
            errorName: err.name,
            errorMsg: err.message
        }
    }
}








module.exports = {log_new_contact, get_user_contacts}