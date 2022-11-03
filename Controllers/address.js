import { Sequelize } from 'sequelize';
const sequelize = require('../models');
const addressmodel = require('../models/useraddress.model')


const addr = addressmodel(sequelize, Sequelize)


const add_address = async (req, res, next) => {

    const { address, city, state, pin_code, phone_no } = req.body;

    const { id } = req.user;

    sequelize
        .sync()
        .then(() => {
            console.log("table created");
            addr
                .create({
                    user_id: id,
                    address,
                    city,
                    state,
                    pin_code,
                    phone_no,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });

    res.json("Address added");
}

const delete_address = async (req, res, next) => {
    const { id } = req.user;

    try {
        await addr.destroy({ where: { user_id: id } });
        return res.json("address deleted");
    } catch (err) {
        return next(err);
    }
}

export default {add_address, delete_address}