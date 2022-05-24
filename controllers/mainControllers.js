const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


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
    },

    productCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/productCreate'))   
    },

    search: (req, res) => {
		res.render('results')
	},

    

}

module.exports = mainController