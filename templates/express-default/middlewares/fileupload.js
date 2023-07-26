const multer = require('multer');

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '_' + file.originalname;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

