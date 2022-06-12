const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const simple = products.filter (product => product.category == "simple product")
const special = products.filter (product => product.category == "special product")

const mainController = {

    index: (req, res) => {
        res.render('home', {simple, special})   
    },

    login: (req, res) => {
        res.render('login')   
    },



    register: (req, res) => {
        res.render('register')   
    },

 
    search: (req, res) => {
		res.render('results')
	},

    

}

module.exports = mainController