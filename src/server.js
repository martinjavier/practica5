const express = require('express');
const {engine} = require('express-handlebars');

const productos = [
    {
        nombre: "calculadora",
        precio: 123.45,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png"
    },
    {   nombre: "reloj",
        precio: 59.34,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png"
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

app.get('/productos', (req, res) => {
    res.render("productos", {
        productos
    })
})

app.get('/cargar', (req, res) => {
    res.render("cargar", {
        productos
    })
})

app.post('/', (req,res) => {
    const { body } = req;
    productos.push(body);
    res.send('<script>alert("Información Guardada");windows.location.href="/"</script>')
})

const PORT = 8080
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));