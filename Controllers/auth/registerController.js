import Joi from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { User } from '../../models';
import bcrypt from 'bcrypt';


const registerController ={
    async register(req, res, next){
        
        const registerSchema = Joi.object({

            firstName : Joi.string().required(),
            lastName : Joi.string().required(),
            userName : Joi.string().required(),
            email : Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.ref('password')

        });

// check validation
        const { error } = registerSchema.validate(req.body);

        if(error){
            return next(error);
        }

    //check if user is in the database already

    try{
        const exist = await User.exists({
            userName: req.body.userName,
            email: req.body.email
        });

        if(exist){
            return next(CustomErrorHandler.alreadyExist("user name or email exists in database"));
        }

    }catch(err){
        return next(err);
    }



    const{ firstName, lastName, userName, email, password } = req.body;


    // password encryption

    const encryptPassword = await bcrypt.hash(password, 10);


    // data

    

    const userdata = new User ({
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        email:email,
        password:encryptPassword
    })

    try{
        await userdata.save();
    }catch(err){
        return next(err);
    }


        res.json("User registerd successfully");

    }

}



export default registerController;