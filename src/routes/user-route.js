const UserControlller = require('../controllers/user-controller');

module.exports = (app, routePrefix) => {
    app.get(routePrefix + '/user', UserControlller.getUser);
    app.post(routePrefix + '/user', UserControlller.upsertUser);
    app.delete(routePrefix + '/user', UserControlller.deleteUser);
}