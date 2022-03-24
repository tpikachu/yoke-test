const User = require("../models/user");
const Product = require("../models/product");

const DummyProducts = [
    {
        productName: 'Product 1',
        price: 10,
        quantity: 20,
    },
    {
        productName: 'Product 2',
        price: 20,
        quantity: 34,
    },
    {
        productName: 'Product 3',
        price: 30,
        quantity: 62,
    },
    {
        productName: 'Product 4',
        price: 40,
        quantity: 67,
    },
    {
        productName: 'Product 5',
        price: 50,
        quantity: 3,
    },
    {
        productName: 'Product 6',
        price: 60,
        quantity: 2,
    },
    {
        productName: 'Product 7',
        price: 70,
        quantity: 1,
    }
]

// NOTE: pwd will be encrypted before saving into DB.
const DummyUsers = [
    {
        name: 'Test',
        email: 'test@gmail.com',
        password: 'test',
        balance: 200
    },
    {
        name: 'John',
        email: 'John@gmail.com',
        password: 'John',
        balance: 5000
    },
    {
        name: 'Alex',
        email: 'Alex@gmail.com',
        password: 'Alex',
        balance: 20
    }
]
/**
 * @param {Object} config Logger configuration
 */
module.exports.feed = () => {
    User.find().then(users => {
        if(!users.length) {
            // Start feed
            DummyUsers.forEach(user => {
                const newUser = new User({...user});
                newUser.save()
            });
        }
    })

    Product.find().then(products => {
        if(!products.length) {
            // Start feed
            DummyProducts.forEach(product => {
                const newProduct = new Product({...product});
                newProduct.save()
            });
        }
    })
}
