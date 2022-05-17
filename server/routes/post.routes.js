const postCtrl = require("../controllers/post.controller");
const jwtMiddleware = require("../middleware/jwt.middleware")

module.exports = (app) => {
    app.post("/api/post", jwtMiddleware.authenticateJwt, postCtrl.addNewPost);
};