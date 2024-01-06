const ProductService = require("../services/product-service");

module.exports = (app) => {
  const service = new ProductService(app);
  app.use("/app-events", async (req, res, next) => {
    try{
      const { payload } = req.body;
      service.SubscribeEvents(payload);
      console.log("--Product Service receiving events--");
      return res.status(200).json(payload);
    } catch(err){
      console.log(err);
    }
    
  });
};
