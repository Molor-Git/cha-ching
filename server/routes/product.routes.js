const productCtrl = require("../controllers/product.controller");
const jwtMiddleware = require("../middleware/jwt.middleware")

module.exports = (app) => {
    app.get("/api/products", productCtrl.findAllProducts);
    app.get("/api/products/:id", productCtrl.findOneProduct);
    app.put("/api/products/:id", productCtrl.updateExistingProduct);
    app.post("/api/products", jwtMiddleware.authenticateJwt, productCtrl.createNewProduct);
    app.delete("/api/products/:id", productCtrl.deleteAnExistingProduct);
};