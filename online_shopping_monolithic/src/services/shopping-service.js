const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {

    constructor(){
        this.repository = new ShoppingRepository();
    }
 
    async PlaceOrder(userInput){

        const { _id, txnNumber } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
        
        return FormateData(orderResult);
    }

    async GetOrders(customerId){
        
        const orders = await this.repository.Orders(customerId);
        return FormateData(orders)
    }
  
}

module.exports = ShoppingService;