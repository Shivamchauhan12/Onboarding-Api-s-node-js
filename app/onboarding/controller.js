const { user, userToken } = require("./../../databasemodel/schema");
const { sendMail } = require("./../../helper/nodemailer");
const path = require("path");
const fs = require("fs");
const { nextTick } = require("process");
const { encryptPassword, decryptPassword } = require("./../../helper/bcrypt");
const generateJWT = require("./../../helper/jwt");

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await user.findOne({ email: email });
        if (user === null) {
            res.status(404).json({ message: "user does not exist" });
        }
        if (user.is_Verified == false) {
            res.status(403).json({ message: "Plsease first verify your mail" });
        }
        if (await decryptPassword( user.password, password)) {
            const myJwtToken = generateJWT(user);
            res
                .status(200)
                .json({ message: "you are logged in", JWtToken: myJwtToken });
        } else {
            res.status(403).json({ message: "Password is invalid" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await user.findOne({ email });
        if (user === null) {
            res.status(404).json("User Not Found ! please check your email");
        }
        const otp = Math.floor(Math.random() * 900000 + 100000);

        await sendMail(email, user.firstname, otp);

        await new userToken({ user_id: user._id, otp: otp ,type:"resetPassword"}).save();

        res.send("we have sent an link to your mail to reset your password ");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        let { password, confirmPassword, otp } = req.body;
        if (password != confirmPassword) {
            return res
                .status(400)
                .json({ status: "confirm Password does not equal to Password" });
        }
        
        const hasssedPassword = await encryptPassword(confirmPassword);

        const token_userdata = await userToken.findOne({ otp: otp });

        if (token_userdata.type === "verification") {
            return res.send("!bad request");
        }

        const updated = await user.updateOne(
            { _id: token_userdata.user_id },
            { $set: { Password: hasssedPassword } }
        );

        if (updated.nModified === 0) {
            res.status(400).json({ status: "Your password has not been updated" });
        } else {
            await userToken.deleteOne({ otp: otp });
            return res
                .status(200)
                .json({ status: "Your password is successfully changed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userProfile = async (req, res) => {
    try {
        let userID = req.authenticData._id;
        const user_data = await user.findOne({ _id: userID });
        if(user_data !== null){
            res
            .status(200)
            .json({
                Firstname: user_data.firstname,
                Lastname: user_data.lastname,
                EmailAddress: user_data.email,
                Country: user_data.country,
            });
        }else{
            res.status(404).json({ message:"user not found"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfileName = async (req, res) => {
    try {
        const { firstname, lastname } = req.body;
        const userID = req.authenticData._id;
        const user_data = await user.findOne({ _id: userID });
        if(user_data !== null){
            const updated = await user.updateOne(
                { _id: userID },
                { firstname, lastname }
            );
            res.status(200).json({ status: "Name updated successfully" });
        }else{
            res.status(404).json({ status: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const userID = req.authenticData._id;
        const user = await user.findOne({ _id: userID });
        if(user !== null){
            if (await decryptPassword(user.password, req.body.oldPassword)) {
                var hasssedPassword = await encryptPassword(req.body.newPassword);
                await user.updateOne(
                    { _id: userID },
                    { $set: { Password: hasssedPassword } }
                );
                return res.status(201).json("password changed successfully");
            }else {
                return res.status(404).json({ message: "old password is invalid" })   
    }
}
        else {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    forgetPassword,
    resetPassword,
    userProfile,
    updateProfileName,
    changePassword,
};
