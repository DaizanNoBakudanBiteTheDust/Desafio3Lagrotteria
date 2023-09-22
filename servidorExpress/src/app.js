import express from 'express';
import ProductManager from './managers/productManager';

const productManager = new ProductManager('./files/productos.json');

// Crea server express
const app = express();


// dijo el profesor que deberia estar siempre
app.use(express.urlencoded({extended: true}))


// Busqueda por params

app.get('/producto:id', (req, res) =>{
    const productId = Number(req.params.id);
    const producto = products.find(p => p.id === productId);
    if (!producto) return res.send ({
        error: 'usuario no encontrado'});
        res.send(producto);
    });


app.get('/productoquery', (req, res) =>{
    const queryParams = req.query;
    res.send(queryParams);
    });

app.get('productoBusqueda', (req, res) =>{

})    



app.listen(8080, () => console.log("listening en 8080"));