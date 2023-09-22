import express from 'express';
import ProductManager from './managers/productManager.js';

// Crea server express
const app = express();

const manager = new ProductManager('./files/productos.json');


// dijo el profesor que deberia estar siempre
app.use(express.urlencoded({extended: true}));

// traer todos los productos

app.get('/products', async (req, res) =>{
    const products = await manager.getProducts();
    console.log(products)
    res.send(products)
    });


app.listen(8080, () => console.log("listening en 8080"));