const db = require("../models");

// read

const getPaymentStatuses = async () => {
  const paymentStatuses = await db.PaymentStatus.findAll();
  return paymentStatuses;
};

//create

const createPaymentStatus = async (paymentStatusName) => {
  const newPaymentStatus = await db.PaymentStatus.create({
    paymentStatusName,
  });
  return newPaymentStatus;
};

// update

const updatePaymentStatus = async (
  paymentStatusId,
  updatePaymentStatusName
) => {
  const paymentStatus = await db.PaymentStatus.findByPk(paymentStatusId);
  paymentStatus.paymentStatusName = updatePaymentStatusName;

  await paymentStatus.save();
};

// delete

const deletePaymentStatus = async (paymentStatusId) => {
  const paymentStatus = await db.PaymentStatus.findByPk(paymentStatusId);
  await paymentStatus.destroy();
};

module.exports = {
  getPaymentStatuses,
  createPaymentStatus,
  updatePaymentStatus,
  deletePaymentStatus,
};
