const { body, check, validationResult } = require('express-validator');

module.exports = {
    login: [
        body('Email').notEmpty().withMessage('Email is required.').isEmail().withMessage("Email is invalid"),
        body('Password').notEmpty().withMessage('Password is required.').isLength({ min: 8, max: 20 }).withMessage("password must be 8 to 20 character long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "i")
            .withMessage("Username must contain at least one lowercase letter, one uppercase letter, and one special character"),
    ],

    forgetPassword: [
        body('Email').notEmpty().withMessage('Password is required.').isEmail().withMessage("Email is invalid")
    ],
    resetPassword: [
        body('Password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be 8 to 20 characters long.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "i")
            .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one special character.'),
        body('confirmPassword')
            .notEmpty().withMessage('Confirm Password is required.')
            .custom((value, { req }) => value === req.body.Password)
            .withMessage("Passwords don't match.")
    ],

    updateProfileName: [
        body('Firstname')
            .notEmpty().withMessage('Email is required.')
            .matches(/^[a-zA-Z0-9]+$/).withMessage("First name should only contain letters no special character allwoed.")
            .isLength({ max: 20 }).withMessage("First name must be below 20 characters."),
        body('Lastname')
            .optional()
            .isString().withMessage("Last name should only contain letters.")
            .matches(/^[a-zA-Z]+$/).withMessage("First name should only contain letters no special character allwoed.")
            .isLength({ max: 20 }).withMessage("Last name must be below 20 characters.")
    ],
    changePassword: [
        body('oldPassword').notEmpty().withMessage('old password should not be empty'),
        body('newPassword').notEmpty().withMessage('Password is required.').isLength({ min: 8, max: 20 }).withMessage("password must be 8 to 20 character long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "i")
            .withMessage("Username must contain at least one lowercase letter, one uppercase letter, and one special character")
    ],
    validator: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next()
        }
    }
}