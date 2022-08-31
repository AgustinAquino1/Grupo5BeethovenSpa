const db = require('../../data/models');
const sequelize = db.sequelize;
const Carts = db.Cart;

const apiCartsController = {
    list : (req, res) => {
        Carts.findAll()
            .then(carts => {
                let respuesta = {
                    meta:{
                        status: 200,
                        total: carts.length,
                        url: "api/carts"
                    },
                    data: carts
                }
                res.json(respuesta)
            })
    },
    detail : (req, res) => {
        let cartsId = req.params.id
        
        Carts.findByPk(cartsId)
            .then(cart => {
                let respuesta = {
                    meta:{
                        status: 200,
                        url: "api/carts/detail/"+cartsId
                    },
                    data: cart
                }
                res.json(respuesta)
            });
    },

    

}

module.exports = apiCartsController