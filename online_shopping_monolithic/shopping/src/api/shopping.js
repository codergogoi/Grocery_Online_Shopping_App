const { SHOPPING_BINDING_KEY, CUSTOMER_BINDING_KEY } = require("../config");
const ShoppingService = require("../services/shopping-service");
const { PublishMsg, SubscribeMsg } = require("../utils");
const UserAuth = require('./middlewares/auth');

module.exports = (app, channel) => {
    
    const service = new ShoppingService();
    SubscribeMsg(channel, service, SHOPPING_BINDING_KEY);

    app.post('/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;


        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});
            const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER');
            PublishMsg(
              channel,
              CUSTOMER_BINDING_KEY,
              JSON.stringify(payload.data)
            );
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    });
       
    
    app.get('/cart', UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        try {
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
}