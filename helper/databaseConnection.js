const mongoose=require('mongoose');

var dbConn=async ()=>{
    try {
        const conn=await mongoose.connect("mongodb://localhost:27017/userInformation");
        if(conn){
            console.log("connection successful");
        }
    } catch (error) {
        console.log(error.message);
    }
}





module.exports=dbConn;