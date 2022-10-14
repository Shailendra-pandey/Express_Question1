import { User } from "../../models";

const userlist = {
    async list (req, res, next){

        const { page = 2, limit = 10} = req.query;
        
        try{

            const users = await User.find().limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await User.countDocuments();

            res.json({
                users,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
            
        }catch(err){
            return next(err);
        }

    }
}

export default userlist;