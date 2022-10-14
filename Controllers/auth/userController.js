import { User } from "../../models";

const userController ={
        async userdetail (req, res, next){
            
            try{
                const user = await User.findOne({_id: res.user});

                res.json(user);

            }catch(err){
                return next(err);
            }

        }

}

export default userController;