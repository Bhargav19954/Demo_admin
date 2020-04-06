
const { check } = require('express-validator');




exports.validateUser = [
check('email').isEmail(),

check('password')
    
    .exists()
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')

    .isLength({ min: 8 })
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')

    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')
]