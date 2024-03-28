
const jwt = require('jsonwebtoken');
const {user} = require("./../databasemodel/schema");

const verifyJWTToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const Secretkey = "Mahadev";
        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(" ");
            req.jwtToken = bearer[1];
            const result = jwt.verify(req.jwtToken, Secretkey);
            const userdata= user.findOne({_id:result._id});
            if(userdata !== null){
              req.authenticData = result;
              next();
           }else{
            return res.status(401).send({ auth: false, message: 'Invalid Token' });
           }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

module.exports = verifyJWTToken;