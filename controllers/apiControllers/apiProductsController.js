const db = require('../../data/models');
const sequelize = db.sequelize;
const Products = db.Product;

const apiProductsController = {
    list : (req, res) => {
        Products.findAll()
            .then(products => {
                let respuesta = {
                    meta:{
                        status: 200,
                        total: products.length,
                        url: "api/products"
                    },
                    data: products
                }
                res.json(respuesta)
            })
    },
    detail : (req, res) => {
        let productsId = req.params.id
        
        Products.findByPk(productsId)
            .then(product => {
                let respuesta = {
                    meta:{
                        status: 200,
                        url: "api/products/detail/"+productsId
                    },
                    data: product
                }
                res.json(respuesta)
            });
    },

    

}

module.exports = apiProductsController;
