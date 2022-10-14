import { User } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";

const userHandler = async (req, res, next) => {
    let header = req.headers.authorization;
    
    if(!header){
        return next(CustomErrorHandler.tokenNotFound());
    }

    const token = header.split(' ')[1];

    try{
        const user = await User.findOne({_id: token});

        if(!user){
            return next(CustomErrorHandler.tokenNotFound());
        }

        req.user = token;

    }catch(err){
        return next(CustomErrorHandler.tokenNotFound());
    }

    next();

}


export default userHandler;