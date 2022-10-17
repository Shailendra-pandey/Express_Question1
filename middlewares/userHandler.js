import { access_token } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";

const userHandler = async (req, res, next) => {
    let header = req.headers.authorization;
    
    if(!header){
        return next(CustomErrorHandler.tokenNotFound());
    }

    const token = header.split(' ')[1];
    try{
        const access = await access_token.findOne({access_token: token});

        if(!access){
            return next(CustomErrorHandler.tokenNotFound());
        }

        req.user = access.user_id;

    }catch(err){
        return next(CustomErrorHandler.tokenNotFound());
    }

    next();

}


export default userHandler;