const fs = require("fs");

const writeFile = async (path, data, overwrite = true) => {
  try {
    if (fs.existsSync(path)) {
      if (!overwrite) {
        return 0;
      }
    }
    await fs.promises.writeFile(path, data);
    return 1;
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    return -1;
  }
};
module.exports = {
  writeFile,
};
