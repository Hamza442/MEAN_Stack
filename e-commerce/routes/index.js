var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
    //success message will be flashed
    //when order is submitted success fully
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
          //we are finding the products and rendering them here
        var productChunks = [];
        var chunkSize = 3;
        // we are using chunk size so that it may jump after every 3 products
        for (var i = 0; i < docs.length; i += chunkSize) {
            // from 0 to 3 this will be the first chunk of products that we will push in
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        
        //then pass the product chunks array 
        //console.log(productQty);
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});
//here we will be expecting the id of the product
router.get('/add-to-cart/:id', function(req, res, next) {
    //we will have a cart object that we will push into the session
   

    var productId = req.params.id;
    
    //through session checking old cart
    //if my old cart exist then pass the old cart 
    //if not then a new empty js object
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log("Session is created in cart"+req.session.cart); 

    Product.findById(productId, function(err, product) {
        console.log(product);
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        //here storing cart object in session
        //express session will automatically save it
        req.session.cart = cart;
        var cookieValue = JSON.stringify([req.session.cart]);       
        var cookie = req.cookies.cookieName;
            // no: set a new cookie
            res.cookie('cookieName',cookieValue,{ maxAge: 180 * 60 * 1000, httpOnly: true});
            // res.send({productId:req.params.id,totalOty:req.params.totalPrice,totalPrice:req.params.totalPrice});
            console.log('cookie created successfully');
            // yes, cookie was already present 
            // console.log('cookie exists', cookieValue);
            res.redirect('/');
    });
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/decrease/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
    
    
    //here checking if we have a cart or not
   if (!req.session.cart) {
       //if we dont have a shooping cart then products will be null
       return res.render('shop/shopping-cart', {products: null});
   } 
   //if dont have cart then make new one
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    //it will stores only one error that is being flashed in the post request
    var errMsg = req.flash('error')[0];//0 indicated the first element in the array
    //passing error messagee to the view
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    
    var stripe = require("stripe")(
        //this is the key that we used for encryption that is from our api settings
        // it is sceret key
        "sk_test_fwmVPdJfpkmwlQRedXec5IxR"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        //the token created by the stripe js which validated the credi card
        //token is being added in checkout.js file
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            //error stored in error object and message provided by the stripe
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            //payment id is being retrived from the charge object
            //the payment is provided by the stripe
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            //clearing the cart
            req.session.cart = null;
            res.redirect('/');
        });
    }); 
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //here we are keeping the record of where user was by req.url
    //so we are storing the old url
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
