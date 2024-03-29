//´´´´´´´´´´´´´´ express()     (don´t touch) ***************
const express = require ('express');
const cookies = require ('cookie-parser')
const session = require ('express-session')

//´´´´´´´´´´´´´´ Require's  (don´t touch) ***************
const app = express();
const userLoggedMiddelware = require ('./middlewares/userLogedMiddelware')
const port = 3000
const path = require ('path')
const methodOverride = require('method-override');


const mainRouter = require ('./routers/mainRouter')
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');
const apiProductsRouter = require('./routers/apiRouters/apiProductsRouter')
const apiUsersRouter = require('./routers/apiRouters/apiUsersRouter')
const cartsRouter = require('./routers/cartsRouter')

//´´´´´´´´´´´´´´ Middlewares     (don´t touch) ***************

app.use (session ({
    secret: "mensaje secreto",
    resave: false,
    saveUninitialized: false}));
app.use(cookies());
app.use (userLoggedMiddelware);
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use (methodOverride('_method'));

//´´´´´´´´´´´´´´ Template Engine     (don´t touch) ***************
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname, 'views'));






app.listen ( port, () => {
    console.log ("servidor funcionando")
})

app.use("/", mainRouter)


app.use('/products', productsRouter);

app.use('/users', usersRouter);

app.use('/api', apiProductsRouter)

app.use('/api', apiUsersRouter);

app.use('/cart', cartsRouter);

app.use((req,res,next) => { 
    const err = new Error("VUELVE CON TU MASCOTA")
    err.status = 404
    next(err)
 });

app.use((err, req, res, next) =>{ 
    if (res.headersSent){ 
        return next (err)
    }
    res.status(404)
    res.render("../views/error.ejs" , { 
      error: err,
      message: err.message    
      }) 
  });
      