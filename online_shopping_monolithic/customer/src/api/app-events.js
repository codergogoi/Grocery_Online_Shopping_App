const CustomerService = require("../services/customer-service");

module.exports = (app) => {
  const service = new CustomerService(app);
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;
    service.SubscribeEvents(payload);
    console.log("--Customer Service receiving events--");
    return res.status(200).json(payload);
  });
};
