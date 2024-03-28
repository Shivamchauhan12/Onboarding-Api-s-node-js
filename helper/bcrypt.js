let bcrypt=require('bcrypt');

let saltRound=10;

let encryptPassword=async(password)=>{
    try {
       const encryptPassword= await bcrypt.hash(password,saltRound)
        return encryptPassword;
    }catch (error) {
        console.log(error.message)
    }
}

let decryptPassword=async(hassedDatabasePass,password)=>{
    try {
        const ismatch=await bcrypt.compare(password,hassedDatabasePass);
        return ismatch;
    } catch (error) {
        console.log(error.message) 
    }
}

module.exports={encryptPassword,decryptPassword}