const express = require('express');
const {engine} = require('express-handlebars');

const usuarios = [
    {
        nombre: "Juan",
        edad: 30,
        estilo: "est1"
    },
    {
        nombre: "Pedro",
        edad: 50,
        estilo: "est1"
    },
    {
        nombre: "Andres",
        edad: 76,
        estilo: "est2"
    }
]

const productos = [
    {
        nombre: "calculadora",
        precio: 123.45,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png"
    }
]

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine(
    'hbs',
     engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layout',
        partialsDir: __dirname + '/views/partials'
}))

app.get('/', (req, res) => {
    res.render("main", {
        productos
    })
})

const PORT = 8080
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));