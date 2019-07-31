const account = require('./account/lib.js');

module.exports = function (app) {
    app.post("/signin", account.signin);
    app.post("/signup", account.signup);
    app.get("/getUser", account.getUser);
    app.post("/updateUser", account.updateUser);
}