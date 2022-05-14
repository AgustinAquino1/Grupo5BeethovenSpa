const express = require ('express');
const app = express();
const port = 3000
const path = require ('path')



const mainRouter = require ('./routers/mainRouter')

app.use(express.static(path.resolve(__dirname, './public')));

app.set('view engine','ejs');

app.set('views', path.resolve(__dirname, 'views'));


app.use(express.static('public'));

app.listen ( port, () => {
    console.log ("servidor funcionando")
})

app.use("/", mainRouter)


