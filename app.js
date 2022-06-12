const express = require ('express');
const app = express();
const port = 3030
const path = require ('path')
const methodOverride = require('method-override');



const mainRouter = require ('./routers/main')

const productsRouter = require('./routers/products'); 

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('view engine','ejs');

app.set('views', path.resolve(__dirname, 'views'));

app.use (methodOverride('_method'));


app.use(express.static('public'));

app.listen ( port, () => {
    console.log ("servidor funcionando")
})

app.use("/", mainRouter)


app.use('/products', productsRouter);
