const db = require("../models");

// read

const getPaymentTypes = async () => {
  const paymentTypes = await db.PaymentType.findAll();
  return paymentTypes;
};

//create

const createPaymentType = async (paymentTypeName, status) => {
  const newPaymentType = await db.PaymentType.create({
    paymentTypeName,
    status,
  });
  return newPaymentType;
};

// update
const updatePaymentType = async (
  paymentTypeId,
  updatePaymentTypeName,
  updatePaymentTypeStatus
) => {
  const paymentType = await db.PaymentType.findByPk(paymentTypeId);
  paymentType.paymentTypeName = updatePaymentTypeName;
  paymentType.status = updatePaymentTypeStatus;

  await paymentType.save();
};

// delete

const deletePaymentType = async (paymentTypeId) => {
  const paymentType = await db.PaymentType.findByPk(paymentTypeId);
  await paymentType.destroy();
};

module.exports = {
  getPaymentTypes,
  createPaymentType,
  updatePaymentType,
  deletePaymentType,
};
