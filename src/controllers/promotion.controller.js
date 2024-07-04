const db = require("../models");

const addPromotion = async (fields) => {
  const { discountAmount, startDate, endData, allow } = fields;
  return await db.Promotion.create({
    discountAmount,
    startDate,
    endData,
    allow,
  });
};

const updatePromotion = async (updatePromotionId, fieldsPromotionUpdate) => {
  return await db.Promotion.update(
    {
      ...fieldsPromotionUpdate,
    },
    {
      where: {
        id: updatePromotionId,
      },
    }
  );
};

const removePromotion = async (deletePromotionId) => {
  return await db.Promotion.destroy({
    where: {
      id: deletePromotionId,
    },
  });
};

module.exports = {
  addPromotion,
  updatePromotion,
  removePromotion,
};
