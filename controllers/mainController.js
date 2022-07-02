const fs = require('fs');
const path = require('path');
const session = require ('express-session')

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const simple = products.filter (product => product.category == "simple product")
const special = products.filter (product => product.category == "special product")

const mainController = {

    index: (req, res) => {
        
        if(req.session && req.session.user){
            let data = req.session
            res.render('home', {data:data, simple, special})
        }

            res.render('home', {simple, special})   

    },

 
    search: (req, res) => {
		res.render('results')
	}

    

}

module.exports = mainController