const express = require("express");
const router = express.Router();
const Multer = require('multer');
const firebase = require('firebase-admin');
const serviceAccount = require('../../firebase/fitwin-portfolio-firebase-adminsdk-i8rmx-47056686bc.json'); // Path to your Firebase service account key file

const upload = Multer({ storage: Multer.memoryStorage() });

// Initialize Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: 'fitwin-portfolio.appspot.com', // Replace with your Firebase Storage bucket URL
});

router.post('/', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const file = req.file;
  const bucket = firebase.storage().bucket();

  // Set the desired file name in Firebase Storage
  const fileName = `${Date.now()}_${file.originalname}`;

  // Create a file upload stream to Firebase Storage
  const uploadStream = bucket.file(fileName).createWriteStream();

  // Handle stream events
  uploadStream.on('error', (err) => {
    console.error('Error uploading file to Firebase Storage:', err);
    return res.status(500).json({ error: 'Failed to upload file.' });
  });

  uploadStream.on('finish', () => {
    //const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/${fileName}`;
    return res.status(200).json({ downloadUrl });
  });

  // Pipe the uploaded file stream to Firebase Storage
  uploadStream.end(file.buffer);
});

module.exports = router;