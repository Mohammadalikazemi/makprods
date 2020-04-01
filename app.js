const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended:false
}));

app.set('view engine','pug');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')));


//database
const User = require('./model/user');
const sequelize = require('./utils/database');
const Product = require('./model/product');
const Cart = require('./model/cart');
const CartItem = require('./model/cartItem');
const Order = require('./model/order');
const OrderItem = require('./model/order-item');

//

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const {
    get404
} = require('./controllers/error')

app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(e => console.log(e));
});


app.use('/admin', adminRouters);
app.use(shopRouters);

app.use(get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
}); // Product Moteaaaleqh be User
User.hasMany(Product)

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{
    through:OrderItem
})




sequelize
    // .sync({force:true}) // Create table in define sequelize
    .sync() // Create table in define sequelize
    .then(result => {
        return User.findById(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: "Mohammad Ali Kazemi",
                email: "MAK@gmail.com"
            });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(port, () => {
            console.log(`Sever is Running in Port ${port}`.toString().toUpperCase())
        });
    })
    .catch(err => {
        console.log(err)
    })