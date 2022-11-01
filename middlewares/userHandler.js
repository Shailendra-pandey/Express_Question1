import Jwt from "jsonwebtoken";
// import { access_token } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const userHandler = async (req, res, next) => {
    let header = req.headers.authorization;
    
    if(!header){
        return next(CustomErrorHandler.tokenNotFound());
    }

    const token = header.split(' ')[1];

    if(!token){
        return next(CustomErrorHandler.tokenNotFound());
    } 


    try{
        const {id} = await JwtService.verify(token);
        req.user = {id};

        next();


    }catch(err){
        return next(err);
    }
}


export default userHandler;