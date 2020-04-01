const {
    Router
} = require('express');

const router = Router();

const adminControllers = require('../controllers/admin');

router.get('/add-product',adminControllers.getAddProducts);

router.post('/add-product',adminControllers.postAddProducts);

router.get('/edit-product/:productId',adminControllers.getEditProducts);

router.post('/edit-product',adminControllers.postEditProducts);

router.get('/products',adminControllers.getProducts);

router.post('/delete-product',adminControllers.postDeleteProduct)


module.exports = router;