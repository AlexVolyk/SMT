const router = require('express').Router();
const {UserModel} = require('../models');
const{UniqurConstraintError} = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    let {email, password, firstName, lastName} = req.body.user;
    try{
        let User = await UserModel.create({
            email,
            password,
            firstName,
            lastName,
        });

        let token = jwt.sign({id: User.id, email: User.email}, "secret-key", {expiresIn: 60 * 60 * 24})
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err){
        res.status(500).json({
            message: `Failes to register user ${err}`,
        });
    }
});


router.post('/login', async (req, res) => {
    let { email } = req.body.user;

    try {
    let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        })
        if(loginUser){
            res.status(200).json({
                user: loginUser,
                message: "User logged in"
            })
        } else {
            res.status(401).json({
                message: "User not authorized"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to loggin"
        })
    }
});

// router.post('/login', async (req, res) => {
//     let { email, password } = req.body.user;

//     try {
//     let loginUser = await UserModel.findOne({
//             where: {
//                 email: email,
//             },
//         });
        
//         if (loginUser){
//             res.status(200).json({
//                 user: loginUser,
//                 message: "User successfully logged in"
//             });
//         } else {
//             res.status(401).json({
//                 message: 'Login failed'
//             });
//             }
//         } catch (error){
//             res.status(500).json({
//                 message: "Failes to log user in",
//             })
//         }
//     });


module.exports = router;