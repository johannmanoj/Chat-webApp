const {QueryTypes} = require('sequelize');
const db = require('./index');

const get_user_contact_messages = async (user_email, contact_email) => {
    try {
        const result = await db.sequelize.query(
            'SELECT * FROM chatapp.messages WHERE user_email = ? AND contact_email = ?',
            {
                replacements: [user_email, contact_email],
                type: QueryTypes.SELECT
            }
        );
        console.log(result)
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

const delete_particular_message = async (message_id) =>{
    try {
        const result = await db.sequelize.query(
            'DELETE FROM chatapp.messages WHERE id = ?',
            {
                replacements: [message_id],
                type: QueryTypes.SELECT
            }
        );
        console.log(result)
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

const delete_contact_messages = async (user_email, contact_email) =>{
    try {
        const result = await db.sequelize.query(
            'DELETE FROM chatapp.messages WHERE user_email = ? AND contact_email = ?',
            {
                replacements: [user_email, contact_email],
                type: QueryTypes.SELECT
            }
        );
        console.log(result)
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

const log_message = async (query_data) => {
    try {
        const result = await db.sequelize.query(
            `INSERT INTO chatapp.messages (user_email, contact_email, message, type) VALUES ${query_data}`,
            {
                replacements: [],
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





// get_user_contact_messages("johann.perfit@gmail.com","carol@gmail.com")
// delete_particular_message("10")
// delete_contact_messages("carol@gmail.com","johann.perfit@gmail.com")



module.exports = {get_user_contact_messages, delete_particular_message, delete_contact_messages, log_message}