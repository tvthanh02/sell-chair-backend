const { badRequest } = require("../../utils/response-methods.util");

const orderValidator = (req, res, next) => {
  const { customerId, orderProducts } = req.body;

  if (!customerId) {
    badRequest(res, "customerId missing field!");
    return;
  }

  if (!orderProducts) {
    badRequest(res, "orderProducts missing field!");
    return;
  } else {
    if (!Array.isArray(orderProducts)) {
      badRequest(res, "orderProducts wrong format!");
      return;
    }
  }

  next();
};

const orderUpdateValidator = (req, res, next) => {
  const { orderId, orderStatusId } = req.body;

  if (!orderId) {
    badRequest(res, "orderId missing field!");
    return;
  }

  if (!orderStatusId) {
    badRequest(res, "orderStatusId missing field!");
    return;
  }
  next();
};
module.exports = {
  orderValidator,
  orderUpdateValidator,
};
