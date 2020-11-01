const UserController = require("../../controllers/user-controller");
const axios = require('axios');
module.exports = {
    Query: {
        users: (obj, args, context, info) => {
            const { req } = args;

            return UserController.getUser({
                body: {
                    ...req
                }
            });
        },
    },

    Mutation: {
        upsertUser: (obj, args, context, info) => {
            const { req } = args;

            return UserController.upsertUser({
                body: {
                    ...req
                }
            });

        },
        deleteUser: (obj, args, context, info) => {
            const { req } = args;

            return UserController.deleteUser({
                body: {
                    ...req
                }
            });
        },
    },
}
