const express = require('express');
const router = express.Router();
const { login, forgetPassword, resetPassword, userProfile, updateProfileName, changePassword } = require('./controller');
const valiadtorMiddleware = require('./validator');
const verifyJWTToken = require('./../../middlewares/verifyJWT')



router.post("/login", valiadtorMiddleware.login, valiadtorMiddleware.validator, login);

router.post('/forgetPassword', valiadtorMiddleware.forgetPassword, valiadtorMiddleware.validator, forgetPassword);

router.post('/resetPassword', valiadtorMiddleware.resetPassword, valiadtorMiddleware.validator, resetPassword);

router.get('/profileDashboard', verifyJWTToken, userProfile);

router.put('/updateProfileName', valiadtorMiddleware.updateProfileName, valiadtorMiddleware.validator, verifyJWTToken, updateProfileName);

router.post('/changePassword', valiadtorMiddleware.changePassword, valiadtorMiddleware.validator, verifyJWTToken, changePassword);

module.exports = router;