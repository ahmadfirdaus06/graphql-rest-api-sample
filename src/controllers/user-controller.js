let users = require("../dummy-store");
const { v4 } = require('uuid');
const responder = require("../helper/responder");
const uuidv4 = v4;

module.exports = {

    getUser: (req, res, next) => {
        const {
            body: {
                uuid
            } = {},
            url = ""
        } = req;

        const result = {
            data: [],
            message: '',
        }

        let user = [];

        if (uuid) {
            users.map((values) => {
                if (values.uuid === uuid) {
                    user.push(values);
                }
            })
        } else {
            user = users;
        }

        if (user.length === 0){
            result.message = "User not found";
        }
        else if (user.length > 0){
            result.data = user;
            result.message = "Success";
        }

        return responder(result, res);
    },

    upsertUser: (req, res, next) => {

        const {
            body: {
                uuid,
                email,
                name
            } = {},
            url = ""
        } = req;

        const result = {
            data: [],
            message: '',
        }

        if (!uuid) {
            const newUser = {
                uuid: uuidv4(),
                name,
                email,
            }
            users.push(newUser);
            result.data = [newUser];
            // result.data = users;
            result.message = "User created";
        } else {
            let existUser = null;

            users.map((values) => {
                if (values.uuid === uuid) {
                    existUser = values;
                }
            });

            if (existUser) {
                existUser.name = name;
                existUser.email = email;
                result.data = [existUser];
                // result.data = users;
                result.message = "User updated";
            }
            else {
                result.message = "User not found";
            }
        }

        return responder(result, res);
    },

    deleteUser: (req, res, next) => {

        const {
            body: {
                uuid
            } = {},
            url = ""
        } = req;

        const result = {
            data: [],
            message: '',
        }


        if (uuid) {
            let existUser = null;
            let indexOf = null;
            users.map((values, index) => {
                if (values.uuid === uuid) {
                    existUser = values;
                    indexOf = index;
                }
            })

            if (existUser) {
                users.splice(indexOf, 1);
                result.data = [existUser];
                // result.data = users;
                result.message = "User removed";
            } else {
                result.message = "User not found";
            }

        }

        return responder(result, res);
    }
}