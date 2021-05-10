const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth')

module.exports = (app) => {
    
    const service = new ProductService();
    const customerService = new CustomerService();


    app.post('/product/create', async(req,res,next) => {

        const { name, desc, type, unit,price, available, suplier, banner } = req.body; 
        // validation
        const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
        return res.json(data);
        
    });

    app.get('/category/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (error) {
            return res.status(404).json({error});
        }

    });

    app.get('/:id', async(req,res,next) => {
        
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (error) {
            return res.status(404).json({error});

        }

    });

    app.post('/ids', async(req,res,next) => {

        const { ids } = req.body;
        const products = await service.GetSelectedProducts(ids);
        return res.status(200).json(products);
       
    });
     
    app.put('/wishlist',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        
        const product = await service.GetProductById(req.body._id);
        
        await customerService.AddToWishlist(_id, product)
         
        res.status(200).json(product);
    });
    
    app.delete('/wishlist/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        const product = await service.GetProductById(productId);
        
        await customerService.AddToWishlist(_id, product)

        res.status(200).json(product);
    });


    app.put('/cart',UserAuth, async (req,res,next) => {

        const { _id, qty } = req.body;
         
        const product = await service.GetProductById(_id);

        await customerService.ManageCart(req.user._id, product, qty, false);

        res.status(200).json(product);
    });
    
    app.delete('/cart/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        const product = await service.GetProductById(req.params.id);

        await customerService.ManageCart(_id, product, 0 , true);
         
        res.status(200).json(product);
    });

    //get Top products and category
    app.get('/', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);

        } catch (error) {
            return res.status(404).json({error});

        }
        
    });
    
}