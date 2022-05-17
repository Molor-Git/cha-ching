const Product = require("../models/product.model");

module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then(allProducts => {
            console.log(allProducts)
            res.json({products: allProducts})
        })
        .catch(err => {
            console.log(err)
            res.json({message: `Something went wrong`, error: err});
        })
};

module.exports.findOneProduct = (req, res) => {
    Product.findOne({_id: req.params.id})
        .then((findProduct) => {
            console.log(findProduct)
            res.json({product: findProduct})
        })
        .catch(err => {
            console.log(err)
            res.json({message: `Something went wrong`, error: err});
        });
};

module.exports.createNewProduct = (req, res) => {
    Product.create(req.body)
        .then(newlyCreatedProduct => {
            console.log(newlyCreatedProduct)
            res.json({createdProduct: newlyCreatedProduct})
        })
        .catch(err => {
            console.log("newlyCreatedProduct has failed")
            res.status(400).json(err);
        });
};

module.exports.updateExistingProduct = (req, res) => {
    Product.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProduct => {
            console.log(updatedProduct)
            res.json({updatedProduct: updatedProduct})
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
};

module.exports.deleteAnExistingProduct = (req, res) => {
    Product.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result)
            res.json({result: result})
        })
        .catch(err => {
            console.log(err)
            res.json({message: `Something went wrong`, error: err})
        })
};