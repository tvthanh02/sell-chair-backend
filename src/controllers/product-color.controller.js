const db = require("../models");

const addColor = async (colorName) => {
  return await db.Color.create({
    colorName,
  });
};

const updateColor = async (updateColorId, colorNameUpdate) => {
  return await db.Color.update(
    {
      colorName: colorNameUpdate,
    },
    {
      where: {
        id: updateColorId,
      },
    }
  );
};

const removeColor = async (deleteColorId) => {
  return await db.Color.destroy({
    where: {
      id: deleteColorId,
    },
  });
};

module.exports = {
  addColor,
  updateColor,
  removeColor,
};
