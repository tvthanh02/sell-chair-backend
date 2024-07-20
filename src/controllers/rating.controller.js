const db = require("../models");

// add rating

const addRating = async (productId, customerId, rate) => {
  await db.Rate.create({
    productId,
    customerId,
    rate,
  });
};

// update rating

const updateRating = async (updateRatingId, updateRate) => {
  const updateRating = await db.Rate.findByPk(updateRatingId);
  updateRating.rate = updateRate;
  await updateRating.save();
};

// delete rating

const deleteRating = async (deleteRatingId) => {
  const updateRating = await db.Rate.findByPk(deleteRatingId);
  await updateRating.destroy();
};

module.exports = {
  addRating,
  updateRating,
  deleteRating,
};
