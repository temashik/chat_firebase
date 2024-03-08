const multer = require('multer');

const storage = multer.memoryStorage();
let processFiles = multer({storage: storage});

module.exports = {processFiles}