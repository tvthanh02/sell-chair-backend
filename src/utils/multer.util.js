const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(path.resolve(__dirname, ".."), "assets/imgs"));
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = uuidv4() + path.extname(file.originalname);
//     cb(null, uniqueSuffix);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
