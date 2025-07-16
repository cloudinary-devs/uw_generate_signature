const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Serve static files
app.use(express.static('public'));

// Signature generation endpoint
app.get('/my_generate_signature', (req, res) => {
  try {
    const paramsToSign = req.query.data;

    if (!paramsToSign) {
      return res.status(400).json({ error: 'Missing data parameter' });
    }

    // Parse the parameters to sign
    const params = JSON.parse(paramsToSign);

    // Generate signature using Cloudinary
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET
    );

    // Return the signature as plain text (as expected by the AJAX call)
    res.setHeader('Content-Type', 'text/plain');
    res.send(signature);
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ error: 'Failed to generate signature' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Signature endpoint: http://localhost:${PORT}`
  );
});
