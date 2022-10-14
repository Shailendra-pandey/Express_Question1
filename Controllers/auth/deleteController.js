import { User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";

const deleteController ={
        async delete (req, res, next){
            
            try{
                const user = await User.deleteOne({_id: res.user});

                res.json('user deleted')

            }catch(err){
                return next(err);
            }

        }

}

export default deleteController;