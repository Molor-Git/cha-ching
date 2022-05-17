const CommentCtrl = require("../controllers/comment.controller");
const jwtMiddleware = require("../middleware/jwt.middleware");

module.exports = (app) => {
    app.post("/api/comment/:postId",jwtMiddleware.authenticateJwt, CommentCtrl.addNewComment)
};