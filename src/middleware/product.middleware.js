const multiValueParamSplitter = (req, res, next) => {
  const { material, color } = req.query;

  const checkMultivalue = (param) => {
    return param.includes(",");
  };

  if (material) {
    req.query.material =
      material && checkMultivalue(material) ? material.split(",") : [material];
  }

  if (color) {
    req.query.color = checkMultivalue(color) ? color.split(",") : [color];
  }

  next();
};

module.exports = {
  multiValueParamSplitter,
};
