//as we are mot storing cart in the database so we will not create a mongoose model
//with this this cart contstructor function we will be able to make cart objects
//when first time cart created oldCart will be empty js object
module.exports = function Cart(oldCart) {
    //the cart should have items
    //as we are going to check old cart with new cart so this item object will have old cart items
    //when ever re create items old cart items will be assigned here
    //here fetching old data
    //oldCart item is undefined then use a empty object
    this.items = oldCart.items || {};
    //total quantity
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    //this function allows to add new items to cart
    //we will also group same products if they are added muliple times
    this.add = function(item, id) {
        
        var storedItem = this.items[id];
        //here we are checking if an item already existed in the old cart
        if (!storedItem) {
            //here adding new product group
            //if not already exist then make a new object
                        //Given new PId//                               
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        //if id already exist then only increasing the price and qty
        storedItem.qty++;
        //calculating total price
                         //price of 1 item//   
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;    //taking price of single item
        this.totalPrice += storedItem.item.price;
    };
    
    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    //this function will give cart items as arra
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};