const express = require ('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve (__dirname, './public')

const port= 3030;


app.listen (port, () =>
    console.log('inicia el servidor'));

app.use(express.static(publicPath));

app.get("/", (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname, './views/home.html'))   
});
app.get("/productDetail", (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetail.html'))   
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'))   
});


app.get("/Cart", (req, res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'))   
});
=======
    res.sendFile(path.join(__dirname, './views/home.html'))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'))
})
>>>>>>> rai

app.get('*', (req, res) => {
    
    res.status(404).send("Not found 404")
    
});


