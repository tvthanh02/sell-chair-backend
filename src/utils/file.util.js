const fs = require("fs");

const writeFile = (path, data) => {
  try {
    fs.writeFileSync(path, data);
    return 1;
  } catch (error) {
    return 0;
  }
};

module.exports = {
  writeFile,
};
