import express from 'express';
import ProductManager from './managers/productManager.js';

// Crea server express
const app = express();

const manager = new ProductManager('./files/productos.json');


// dijo el profesor que deberia estar siempre
app.use(express.urlencoded({
        extended: true
}));
/*
// traer todos los productos

app.get('/products', async (req, res) =>{
    const products = await manager.getProducts();
    console.log(products)
    res.send(products)
    });

*/
// traer todos los productos con query Limitado

app.get('/products', async (req, res) => {
        const products = await manager.getProducts();
        const queryParamsLimited = (req.query.limit);

        if (!queryParamsLimited) {
                res.send({error: 'Error pagina no encontrada'})
        } else {
                const productsLimited = products.slice(0, queryParamsLimited)
                res.send(productsLimited)
        };
});


// busca por id segun lo indicado en obtener id
/*
app.get('/products/:id', async (req, res) =>{
        const productId = Number(req.params.id);
        const product = await manager.getProductById(productId);
        
        if (!product) return res.send({ error: 'Usuario no encontrado' });

        res.send(product)
        });
*/

app.listen(8080, () => console.log("listening en 8080"));