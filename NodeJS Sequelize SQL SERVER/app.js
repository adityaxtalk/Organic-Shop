const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./utils/config');
const api_routes = require('./routes/api_routes');

const Product = require('./models/product.model');
const Cart = require('./models/cart.model');
const CartItem = require('./models/cart-Item.model');
const Order = require('./models/order.model');
const OrderItem = require('./models/order-item.model');
const User = require('./models/user.model');
const Shipping = require('./models/shipping.model')
require('dotenv').config();

var corsOption = {
    origin: 'http://localhost:4200'
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
Shipping.belongsTo(Order)
Order.hasMany(Shipping)

app.use(process.env.API_BASE_URL, api_routes)

sequelize.sync().then(res => {
        console.log('Successful');
    })
    .catch(err => console.log(err));



app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 422);
    res.send("Error occur while handling request");
});

app.listen(process.env.PORT, () => {
    console.log('listening on port 4000');
})