const db = require("../models");

const numPerPage = 100;

const getOrderStatuses = async (page = 1) => {
  const { count, rows } = await db.OrderStatus.findAndCountAll({
    limit: numPerPage,
    offset: (page - 1) * numPerPage,
  });

  return {
    data: rows.map((orderStatus) => orderStatus.get({ plain: true })),
    paging: {
      totalPage: Math.ceil(count / numPerPage),
      currentPage: page,
      rows: count,
    },
  };
};

const createOrderStatus = async (orderStatusName) => {
  await db.OrderStatus.create({
    orderStatusName,
  });
};

const updateOrderStatus = async (
  updateOrderStatusId,
  updateOrderStatusName
) => {
  const orderStatus = await db.OrderStatus.findByPk(updateOrderStatusId);
  orderStatus.orderStatusName = updateOrderStatusName;
  await orderStatus.save();
};

const deleteOrderStatus = async (deleteOrderStatusId) => {
  const orderStatus = await db.OrderStatus.findByPk(deleteOrderStatusId);
  await orderStatus.destroy();
};

module.exports = {
  getOrderStatuses,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
