//´´´´´´´´´´´´´´ express()     (don´t touch) ***************
const express = require ('express');

//´´´´´´´´´´´´´´ Require's  (don´t touch) ***************
const app = express();
const port = 3030
const path = require ('path')
const methodOverride = require('method-override');
const cookieParser = require ('cookie-parser')
const session = require ('express-session')


const mainRouter = require ('./routers/mainRouter')
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');
const userLoggedMiddelware = require ('./middlewares/userLogedMiddelware')


//´´´´´´´´´´´´´´ Middlewares     (don´t touch) ***************

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use (methodOverride('_method'));
app.use (session ({
    secret: "mensaje secreto",
    resave: false,
    saveUninitialized: false}))
app.use (userLoggedMiddelware);

//´´´´´´´´´´´´´´ Template Engine     (don´t touch) ***************
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname, 'views'));






app.listen ( port, () => {
    console.log ("servidor funcionando")
})

app.use("/", mainRouter)


app.use('/products', productsRouter);

app.use('/users', usersRouter);
