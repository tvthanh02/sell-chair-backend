const db = require("../models");
const { formatDateToDatetime } = require("../utils/format.util");
const { Op } = require("sequelize");

const numPerPage = 100;

// read
// 2. filter follow today ( default )
const getOrdersToday = async (page = 1) => {
  const today = formatDateToDatetime(new Date(Date.now()), false);

  const { count, rows } = await db.Order.findAndCountAll({
    limit: numPerPage,
    offset: (page - 1) * numPerPage,
    where: sequelize.where(
      sequelize.fn("DATE", sequelize.col("orderDate")),
      today
    ),
  });

  return {
    data: rows.map((order) => order.get({ plain: true })),
    paging: {
      currentPage: page,
      totalPage: Math.ceil(count / numPerPage),
      rows: count,
    },
  };
};
// 3. filter follow yesterday
const getOrdersYesterday = async () => {
  const yesterday = formatDateToDatetime(
    new Date(Date.now() - 86400000),
    false
  );

  const orders = await db.Order.findAll({
    where: sequelize.where(
      sequelize.fn("DATE", sequelize.col("orderDate")),
      yesterday
    ),
  });

  return orders;
};

// 6. start time -> end time
const getOrdersInRange = async (startDate, endDate) => {
  const orders = await db.Order.findAll({
    where: {
      eventDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return orders;
};

// 7. follow order status

// create

const createOrder = async (customerId, orderProducts, promotionCode = "") => {
  const transaction = db.sequelize.transaction();
  try {
    // customerId
    // products [{ productId, quantity }]
    // promotionCode?

    // check quantity > quantity order
    const products = await Promise.all(
      orderProducts.map((orderProduct) => {
        return new Promise(async (resolve, reject) => {
          const product = await db.Product.findByPk(orderProduct.productId);
          resolve({
            ...product,
            orderQuantity: orderProduct.quantity,
          });
        });
      })
    );

    let invalidProducts = products.filter(
      (product) => product.quantity < product.orderQuantity
    );

    if (invalidProducts.length > 0) {
      throw new Error("Invalid Quantity Order Product");
    }

    // calculate
    // 1. total amount
    let totalAmount = products.reduce((total, current) => {
      total += current.orderQuantity * price;
    }, 0);

    // 2. discount if have promotion
    let validPromotion;
    let discountAmount = 0;
    if (promotionCode) {
      // find promotion
      const promotion = await db.Promotion.findByPk(promotionCode);
      if (promotion) {
        // check allow promotion and valid date
        if (
          promotion.allow > 0 &&
          Date.now() <= new Date(promotion.endDate).getMilliseconds()
        ) {
          validPromotion = promotion;
          discountAmount = (totalAmount * promotion.discountAmount) / 100;
        }
      }

      // 3. final amount

      let finalAmount = totalAmount - discountAmount;

      //  create order
      const order = await db.Order.create(
        {
          /**
           * params:
           * == Order
           * customerId
           * orderDate
           * totalAmount
           * discountAmount
           * finalAmount
           * promotionCode
           * orderStatusId default "pending"
           * shipFee
           */
          customerId,
          orderDate: formatDateToDatetime(new Date(Date.now()), true),
          totalAmount,
          discountAmount,
          finalAmount,
          promotionCode: promotionCode ? promotionCode : null,
          orderStatusId: "",
          shipFee: 20000,
        },
        { transaction }
      );

      // create order detail
      await Promise.all(
        products.map((product) =>
          db.OrderDetail.create(
            {
              orderId: order.id,
              productId: product.id,
              quantity: product.orderQuantity,
              unitPrice: product.price,
              totalPrice: product.orderQuantity * product.price,
            },
            { transaction }
          )
        )
      );
      // update promotion
      validPromotion && (validPromotion.allow -= 1);
      await validPromotion.save({ transaction });

      // update quantity product

      await Promise.all(
        orderProducts.map((orderProduct) => {
          return new Promise(async (resolve, reject) => {
            try {
              const product = await db.Product.findByPk(orderProduct.productId);
              product.quantity -= orderProduct.quantity;
              await product.save({ transaction });
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        })
      );

      // no error => commit
      await transaction.commit();
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// update ( update orderStatus )

const updateOrder = async (updateOrderId, orderStatusId) => {
  const order = await db.Order.findByPk(updateOrderId);
  order.orderStatusId = orderStatusId;

  await order.save();
};

// delete

module.exports = {
  createOrder,
  updateOrder,
  getOrdersToday,
  getOrdersYesterday,
  getOrdersInRange,
};
