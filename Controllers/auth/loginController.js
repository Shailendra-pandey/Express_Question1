import Joi from "joi";
import bcrypt from 'bcrypt';
import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const loginController = {
    async login(req, res, next){
        
        const loginSchema = Joi.object({

            email: Joi.string().email().required(),
            password: Joi.string().required()

        });

        const { error } = loginSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
            const user = await User.findOne({email: req.body.email});

            if(!user){
                return next(CustomErrorHandler.wrongCredentials());
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            if(error){
                return next(error);
            }

            const match =await bcrypt.compare(hashedPassword, user.password, (err, result) =>{


                if(err){
                    return next(error);
                }

    
            });

            const access_token = user._id;

            res.json({access_token});



        }catch(error){
            return next(error);
        }

    }
}

export default loginController;