const express = require ('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve (__dirname, './public')

const port= 3030;


app.listen (port, () =>
    console.log('inicia el servidor'));

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'))   
});
app.get("/productDetail", (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetail.html'))   
});

app.get('*', (req, res) => {
    
    res.status(404).send("Not found 404")
    
})

