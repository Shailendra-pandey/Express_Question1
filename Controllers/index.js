import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { user, access_token, addressSc } from '../models';
import bcrypt from 'bcrypt';
import md5 from 'md5';

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
            const exist = await user.exists({
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



        const userdata = new user({
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
            const users = await user.findOne({ email: req.body.email });

            if (!users) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            if (error) {
                return next(error);
            }

            const match = bcrypt.compare(hashedPassword, users.password, (err, result) => {


                if (err) {
                    return next(err);
                }


            });

            const number = Math.random();
            const token = md5(number);

            const access = new access_token({
                user_id: users._id,
                access_token: token
            });

            try {
                await access.save();
            } catch (err) {
                return next(err);
            }


            res.json({ token });



        } catch (error) {
            return next(error);
        }

    }
}

const addressController = {
    async add_detail(req, res, next) {

        const addressSchema = Joi.object({

            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            pin_code: Joi.number().required(),
            phone_no: Joi.number().required()

        });

        const { address, city, state, pin_code, phone_no } = req.body;

        const { error } = addressSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            const users = await user.findOne({ _id: req.user });

            const add = new addressSc({
                user_id: users._id,
                address,
                city,
                state,
                pin_code,
                phone_no
            });

            try {
                await add.save();
            } catch (err) {
                return next(err);
            }



        } catch (err) {
            return next(err);
        }

        res.json("Address added");

    }
}



const userController = {
    async userdetail(req, res, next) {

        try {
            const users = await user.findOne({ _id: req.user });

            const address = await addressSc.findOne({user_id: req.user});

            res.json({users, address});

        } catch (err) {
            return next(err);
        }

    }

}


const deleteController = {
    async delete(req, res, next) {

        try {
            const users = await user.deleteOne({ _id: req.user });

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

            const users = await user.find().limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await user.countDocuments();

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

export default { registerController, loginController, userController, deleteController, userlist, addressController };