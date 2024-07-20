const db = require("../models");

const numPerPage = 100;

// read

const getPayments = async (page = 1) => {
  const payments = await db.Payment.findAndCountAll({
    limit: numPerPage,
    offset: (page - 1) * numPerPage,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: PaymentType,
        attributes: {
          exclude: ["id", "status", "createdAt", "updatedAt"],
        },
      },
      {
        model: PaymentStatus,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["paymentTypeId", "paymentStatusId"],
    },
  });

  const data = payments.rows.map((payment) => payment.get({ plain: true }));

  return {
    data,
    paging: {
      totalPage: Math.ceil(payments.count / numPerPage),
      currentPage: page,
      rows: payments.count,
    },
  };
};

// create

const createPayment = async (fields) => {
  const {
    orderId,
    paymentTypeId,
    paymentStatusId,
    paymentDate,
    transaction = null,
    paymentAmount,
  } = fields;

  return await db.Payment.create({
    orderId,
    paymentTypeId,
    paymentStatusId,
    paymentDate,
    transaction,
    paymentAmount,
  });
};

// update (paymentStatus, transaction)

const updatePayment = async (
  updatePaymentId,
  updatePaymentStatusId,
  updateTransaction
) => {
  const payment = await db.Payment.findByPk(updatePaymentId);
  payment.paymentStatusId = updatePaymentStatusId;
  payment.transaction = updateTransaction;

  await payment.save();
};

// delete

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
};
