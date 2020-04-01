const {
    Router
} = require('express');

const router = Router();
const shopControllers = require('../controllers/shop');

router.get('/',shopControllers.getIndex);

router.get('/products',shopControllers.getProducts);

router.get('/products/:productId',shopControllers.getProduct);

router.get('/cart',shopControllers.getCart);

router.post('/cart',shopControllers.postCart);

router.post('/create-order',shopControllers.postOrder);

router.get('/orders',shopControllers.getOrders);

router.get('/checkout',shopControllers.getCheckout);

router.post('/cart-delete-item',shopControllers.postCartDeleteProduct);


module.exports = router;