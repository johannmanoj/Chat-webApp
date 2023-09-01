const {QueryTypes} = require('sequelize');
const db = require('./index');

const get_user_info = async (email) => {
    try {
        const result = await db.sequelize.query(
            'SELECT * FROM chatapp.users WHERE email = ?',
            {
                replacements: [email],
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

const log_new_user = async (email, firstName, lastName, profilePic) => {
    try {
        const result = await db.sequelize.query(
            `INSERT INTO chatapp.users (email, firstName, lastName, profilePic) VALUES (?,?,?,?)`,
            {
                replacements: [email, firstName, lastName, profilePic],
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

const update_user_data = async (email, firstName, lastName, profilePic) => {
    try {
        const result = await db.sequelize.query(
            "UPDATE chatapp.users SET firstName = ? , lastName = ?, profilePic = ? WHERE email = ?;",
            {
                replacements: [firstName, lastName, profilePic, email],
                type: QueryTypes.UPDATE
            }
        );
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

module.exports = {get_user_info, log_new_user, update_user_data}