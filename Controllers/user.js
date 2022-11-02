const userdetail = async (req, res, next) => {
    const { id } = req.user;

    try {
        const users = await User.findOne({ where: { id } });
        const address = await addr.findOne({
            where: { user_id: users.dataValues.id },
        });

        res.json({ users, address });
    } catch (err) {
        return next(err);
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.user;

    try {
        await User.destroy({ where: { id } });
        return res.json("user deleted");
    } catch (err) {
        return next(err);
    }
}

const AllUsers = async (req, res, next) => {
    const { page } = req.query;

    try {
        // const users = await User
        //   .findAll()
        //   .limit(limit * 1)
        //   .skip((page - 1) * limit)
        //   .exec();

        const users = await User.findAndCountAll({
            limit: 10,
            offset: (page - 1) * 10,
        });

        // const count = await User.countDocuments();

        res.json({
            users,
            // totalPages: Math.ceil(count / limit),
            // currentPage: page,
        });
    } catch (err) {
        return next(err);
    }
}


export default { userdetail, deleteUser, AllUsers }