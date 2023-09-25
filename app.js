import express from 'express';
import ProductManager from './managers/productManager.js';

// Crea server express
const app = express();

const manager = new ProductManager('./files/productos.json');


app.use(express.urlencoded({
        extended: true
}));

const enviar = async() =>   {
        const productos =  await manager.getProducts();
    
        const product = {
            titulo : 'marco',
            descripcion: 'para cuadros',
            precio: '30$',
            thumbnail: 'https://www.avalco.cl/3650-thickbox_default/escoba5costuras.jpg',
            code: '121123',
            stock: '10',
        };
    
        await manager.addProducts(product);

    
       // elimina producto con id 4 como menciona arriba
    
        const eliminarProducto = await manager.deleteProductById(4);
    
        console.log(eliminarProducto)
    
    
          // actualiza producto seleccionando el ID
          const actualizadoExitosamente = await manager.updateProduct(15, {
            titulo: 'Nueva Escoba updateada 10000',
            descripcion: 'Nueva descripción',
            precio: '40$',
            thumbnail: 'https://www.example.com/nueva-imagen.jpg',
            stock: '15'
        });
        
        console.log(actualizadoExitosamente) 
    
    }
    
    enviar();

// traer todos los productos

app.get('/products', async (req, res) =>{
    const products = await manager.getProducts();
    console.log(products)
    res.send(products)
    });



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

app.get('/products/:id', async (req, res) =>{
        const productId = Number(req.params.id);
        const product = await manager.getProductById(productId);
        
        if (!product) return res.send({ error: 'Usuario no encontrado' });

        res.send(product)
        });


app.listen(8080, () => console.log("listening en 8080"));