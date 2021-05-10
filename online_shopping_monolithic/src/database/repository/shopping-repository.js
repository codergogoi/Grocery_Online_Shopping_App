const mongoose = require('mongoose');
const { CustomerModel, ProductModel, OrderModel } = require('../models');
const { v4: uuidv4 } = require('uuid');

//Dealing with data base operations
class ShoppingRepository {

    // payment

    async Orders(customerId){
        
        const orders = await OrderModel.find({customerId }).populate('items.product');        
        return orders;
    }
 
 
    async CreateNewOrder(customerId, txnId){

        //check transaction for payment Status

        
        const profile = await CustomerModel.findById(customerId).populate('cart.product');

        if(profile){
            
            let amount = 0;   

            let cartItems = profile.cart;

            if(cartItems.length > 0){
                //process Order
                cartItems.map(item => {
                    amount += parseInt(item.product.price) *  parseInt(item.unit);   
                });
    
                const orderId = uuidv4();
    
                const order = new OrderModel({
                    orderId,
                    customerId,
                    amount,
                    txnId,
                    status: 'received',
                    items: cartItems
                })
    
                profile.cart = [];
                
                order.populate('items.product').execPopulate();
                const orderResult = await order.save();
               
                profile.orders.push(orderResult);

                await profile.save();

                return orderResult;
            }
        }

      return {}

    }
}

module.exports = ShoppingRepository;