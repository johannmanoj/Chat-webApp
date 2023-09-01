const user_db = require('../queries/user')

const check_log_or_update_user = async (email, firstName, lastName, profilePic) =>{
    var user_data_res = await user_db.get_user_info(email)

    if(user_data_res["data"].length > 0){
        var update_res = await user_db.update_user_data(email, firstName, lastName, profilePic)
        return update_res
    }else{
        var log_res = await user_db.log_new_user(email, firstName, lastName, profilePic)
        return log_res
    }
}

module.exports = {check_log_or_update_user}