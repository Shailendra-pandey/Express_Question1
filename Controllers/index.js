import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { User } from '../models';
import bcrypt from 'bcrypt';

const registerController = {
    async register(req, res, next) {

        const registerSchema = Joi.object({

            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            userName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.ref('password')

        });

        // check validation
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //check if user is in the database already

        try {
            const exist = await User.exists({
                userName: req.body.userName,
                email: req.body.email
            });

            if (exist) {
                return next(CustomErrorHandler.alreadyExist("user name or email exists in database"));
            }

        } catch (err) {
            return next(err);
        }



        const { firstName, lastName, userName, email, password } = req.body;


        // password encryption

        const encryptPassword = await bcrypt.hash(password, 10);


        // data



        const userdata = new User({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: encryptPassword
        })

        try {
            await userdata.save();
        } catch (err) {
            return next(err);
        }


        res.json("User registerd successfully");

    }

}




const loginController = {
    async login(req, res, next) {

        const loginSchema = Joi.object({

            email: Joi.string().email().required(),
            password: Joi.string().required()

        });

        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            if (error) {
                return next(error);
            }

            const match = await bcrypt.compare(hashedPassword, user.password, (err, result) => {


                if (err) {
                    return next(error);
                }


            });

            const access_token = user._id;

            res.json({ access_token });



        } catch (error) {
            return next(error);
        }

    }
}


const userController = {
    async userdetail(req, res, next) {

        try {
            const user = await User.findOne({ _id: req.user});

            res.json(user);

        } catch (err) {
            return next(err);
        }

    }

}


const deleteController = {
    async delete(req, res, next) {

        try {
            const user = await User.deleteOne({ _id: req.user});

            res.json('user deleted')

        } catch (err) {
            return next(err);
        }

    }

}


const userlist = {
    async list(req, res, next) {

        const { page, limit } = req.query;

        try {

            const users = await User.find().limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await User.countDocuments();

            res.json({
                users,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });

        } catch (err) {
            return next(err);
        }

    }
}

export default { registerController, loginController, userController, deleteController, userlist };