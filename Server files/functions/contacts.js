const contacts_db = require('../queries/contacts')
const user_db = require('../queries/user')


const add_new_contact = async (user, email) =>{
    var user_data_res = await user_db.get_user_info(email)

    if(user_data_res["data"].length > 0){
        var user_data = user_data_res["data"][0]
        var log_res = await contacts_db.log_new_contact(user,user_data["email"], user_data["firstName"], user_data["lastName"], user_data["profilePic"])
        console.log(log_res);
        return log_res
    }
    console.log({statusCode :500, message:"user not found"});
    return {statusCode :500, message:"user not found"}
}



module.exports = {add_new_contact}