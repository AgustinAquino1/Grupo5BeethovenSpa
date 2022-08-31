const db = require('../../data/models');
const sequelize = db.sequelize;
const Products = db.Product;
const Categories = db.Category

const apiProductsController = {
    list : (req, res) => {
        let categoriesArray = []
        let productsData= []
        let nameCategories=[]
        let categoriesData =[]

        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.limit)
        let page= 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber> 0){
            page = pageAsNumber
        }

        let size = 10
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber>= 0 && sizeAsNumber<=30){
            size= sizeAsNumber
        }
        let productsMeta = Products.findAndCountAll({include: Categories})
        let categoriesMeta= Categories.findAndCountAll()
        
        let promiseProduct = Products.findAndCountAll({include: Categories,
             
            limit: size,
            offset: page*size})

        Promise
		 .all([promiseProduct, productsMeta, categoriesMeta])
         
         .then(([productsRows, productsMeta, categoriesMeta])=> {
          
                let products = productsRows.rows
                let productos = productsMeta.rows
                let categorias = categoriesMeta.rows

                
                
                let countCategories = new Array(categoriesMeta.count)
                countCategories.fill(0);
                

                products.forEach((product, i) => {
                    productsData[i] = {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        category: product.Category.category_name,
                        url:"http://localhost:3000/api/products/"+product.id
                               }                                          
                               
                            })

                            productos.forEach((product, i) => {
                                categoriesArray[i] = product.Category.category_name                                              
                                        })

                            categorias.forEach((category, i) => {
                                categoriesArray.forEach((categoryArray, j) => {
                                    
                                    if (category.category_name == categoryArray) {
                                        
                                        nameCategories[i] = category.category_name
                                        countCategories[i] = countCategories[i] + 1;
              
                                    }      
                                })                             
                                
                            })

                           nameCategories.forEach((nameCategory, i) => {
                            categoriesData[i] = {
                                            
                                name: nameCategory,
                                associatedProducts: countCategories[i]
                             } 
                                
                            });
                            
                          
                    
                    
                let respuesta = {
                    meta:{
                        status: 200,
                        count: productsRows.count,
                        countByCategory: {
                             total: categorias.count,
                             category: categoriesData
                            
                        },
                        url: "api/products",
                        totalPages: Math.ceil(productsRows.count / size),
                        nextUrl: page >=0  && (page != ((Math.ceil(productsRows.count / size))-1))? `http://localhost:3000/api/products?page=${page+1}&limit=${size}` : "",
                        previousUrl: page && (page != 0) ? `http://localhost:3000/api/products?page=${page-1}&limit=${size}` : "",
                    },
                    data: productsData
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
                        url: "http://localhost:3000/api/products/"+productsId
                    },
                    data: product
                }
                res.json(respuesta)
            });
    },

    

}

module.exports = apiProductsController;
