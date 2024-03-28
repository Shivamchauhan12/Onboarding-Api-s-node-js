const jwt=require('jsonwebtoken');
const secretKey="Mahadev";
const generateJWT=(user)=>{
    const jwtToken= jwt.sign({_id:user._id,firstName:user.firstname},secretKey,{expiresIn:'600s'})
    return jwtToken;
}

module.exports=generateJWT;