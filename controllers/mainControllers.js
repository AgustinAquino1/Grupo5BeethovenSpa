const path = require ('path');

const mainController = {

    index: (req, res) => {
        res.render(path.join(__dirname, '../views/home'))   
    },

    login: (req, res) => {
        res.render(path.join(__dirname, '../views/login'))   
    },

    productCart: (req, res) => {
        res.render(path.join(__dirname, '../views/productCart'))   
    },

    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/productDetail'))   
    },

    register: (req, res) => {
        res.render(path.join(__dirname, '../views/register'))   
    }

    

}

module.exports = mainController