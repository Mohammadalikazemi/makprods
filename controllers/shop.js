const Products = require('../model/product');
const Order = require('../model/order');

exports.getIndex = (req, res, next) => {
    Products.findAll()
        .then(products => {
            res.render('shop/index', {
                pageTitle: 'Home Page',
                path: '/',
                prods: products
            });
        })
        .catch(e => console.log(e))
}

exports.getProducts = (req, res, next) => {
    Products.findAll()
        .then(products => {
            res.render('shop/product-list', {
                pageTitle: 'All Products',
                path: '/products',
                prods: products
            });
        })
        .catch(e => console.log(e))
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // 1
    Products.findById(prodId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: "product.title",
                path: '/products'
            })
            console.log("****** getProduct *******", product)
            res.redirect('/')
        })
        .catch(e => console.log(e));
}

exports.getCart = (req, res, next) => {
    // Must user.createCart koni in app.js
    req.user.getCart()
        .then(cart => {
            // console.log(result)
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: "Your Cart",
                        products
                    });
                })
                .catch(e => {
                    console.log(e)
                });
        })
        .catch(e => {
            console.log(e)
        })
}


exports.postCart = (req, res, next) => {

    const prodId = req.body.productId;
    let newQuantity = 1
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return products;
            }
            return Products.findById(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(e => {
            console.log(e)
        })



}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
}


exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            console.log("*********  postCartDeleteProduct  *******===>>>", products);
            return products[0].cartItem.destroy();
        })
        .then(result => {
            // console.log(r)
            res.redirect('/cart');
        })
        .catch(e => {
            console.log(e)
        })

}

exports.postOrder = (req, res, next) => {
    let fetchProduct;
    req.user.getCart()
        .then(cart => {
            fetchProduct = cart;
            return cart.getProducts()
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    // order.addProduct(products,{
                    //     through:{quantity}
                    // })
                    order.addProduct(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity
                        };
                        return product;
                    }));
                })
                .catch(e => console.log(e))
        })
        .then(result=>{
            return fetchProduct.setProducts(null);

        })
        .then(result=>{
            res.redirect('/orders')
        })
        .catch(e => console.log(e))

}



exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({include: ['products']})
        .then(orders=>{
            console.log('***************** getOrders  **************',orders)
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders
            });
        })
        .catch(e=>console.log(e))
}