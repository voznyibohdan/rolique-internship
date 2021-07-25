const { passwordHasher } = require('../helpers');
const { User } = require('../dataBase');
const { userService } = require('../services');
const { normalizer } = require('../helpers');
const { statusCodesEnum } = require('../constants');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            // validatorRole.validRole(role);

            const hashedPassword = await passwordHasher.hash(password);
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword
            });

            res.json(newUser);
            // res.status(statusCodesEnum.CREATED).json(constants.USER_IS_CREATED);

            next();
        } catch (error) {
            next(error);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const findUsers = await userService.findAll();
            const users = await normalizer(findUsers);

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { params: { id }, body, body: { password } } = req;

            const hashedPassword = await passwordHasher.hash(password);

            await userService.updateOne(id, { ...body, password: hashedPassword });

            res.status(statusCodesEnum.OK).json(`user id:${id} is updated`);
        } catch (error) {
            next(error);
        }
    },
};
