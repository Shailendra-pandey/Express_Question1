import { JWT_SERVICE } from '../config';
import Jwt from 'jsonwebtoken';


class JwtService{
    static sign(payload, expiry = "3600s", secret = JWT_SERVICE){
        return Jwt.sign(payload, secret, {expiresIn: expiry});
    }


    static verify(token, secret = JWT_SERVICE){
        return Jwt.verify(token, secret);
    }
}



export default JwtService;