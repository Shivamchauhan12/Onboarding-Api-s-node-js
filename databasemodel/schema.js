var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstname: { type: String },  // First name
    lastname: { type: String },
    password: { type: String },
    country: { type: String }
});

var usertoken = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId },
    type: {
        type: String,
        enum: ["verification", "resetPassword"],
        default: "verification"
    },
    otp: { type: Number }
})

var user = mongoose.model('userTable', userSchema);
var userToken = mongoose.model('userToken', usertoken);

module.exports = { user, userToken };
