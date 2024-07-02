const db = require("../models");

const addMaterial = async (materialName) => {
  return await db.Material.create({
    materialName,
  });
};

const updateMaterial = async (updateMaterialId, materialNameUpdate) => {
  return await db.Material.update(
    {
      materialName: materialNameUpdate,
    },
    {
      where: {
        id: updateMaterialId,
      },
    }
  );
};

const removeMaterial = async (deleteMaterialId) => {
  return await db.Material.destroy({
    where: {
      id: deleteMaterialId,
    },
  });
};

module.exports = {
  addMaterial,
  updateMaterial,
  removeMaterial,
};
