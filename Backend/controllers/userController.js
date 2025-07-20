import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    if(req.body.role == "admin"){
        if(req.user != null){
            if(req.user.role != "admin"){
                res.status(401).json({
                    message : "you are not admin you can not create admin accounts" 
                })

        }
    }else{
            res.status(401).json({
                message : "you are not authorized you can not create admin account . Please login as admin" 
            })
    }
};
    const hashPassword = bcrypt.hashSync(req.body.password, 10)

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        role: req.body.role,
        
    })
    user.save().then(() => {
        res.json({ message: "user added" })
    }).catch(() => {
        res.json({ message: "user not added" })
    })
}

export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email}).then(
        (user)=>{
            if(user == null ){
                res.status(404).json({
                    message : "User is not found"
                })
            }else{
                const ispasswordCorrect = bcrypt.compareSync(password,user.password)

                if(ispasswordCorrect){
                    
                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        img : user.img
                    },
                    //pasword key for token can use any pasword for this
                    "secretkey" // should be replaced with process.env.JWT_SECRET in production
                )
                    res.json({
                        message: "login successfull",
                        token: token,
                        role : user.role
                        
                    })
                }else{
                    res.status(401).json({
                        message : "password is incorrect"
                    })
                }
            }
        }
    )


} 

export function isAdmin(req){
    if(req.user == null){
        return false
    }
    if(req.user.role != "admin"){
        return false
    }
    return true
}