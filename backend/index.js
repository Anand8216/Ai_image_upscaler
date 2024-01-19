const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');

const app = express();
const port = 8000;

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("<h1>hiii</h1>");
});

app.post('/api/upscale', upload.single('image'), async (req, res) => {
  try {
    // Retrieve the file buffer from the Multer middleware
    const imageBuffer = req.file.buffer;

    // Create a FormData object and append the file buffer to it
    const data = new FormData();
    data.append('image', imageBuffer, { filename: 'uploadedImage.jpg' }); // Adjust filename as needed
    data.append('sizeFactor', '2');
    data.append('imageStyle', 'default');
    data.append('noiseCancellationFactor', '0');

    const options = {
      method: 'POST',
      url: 'https://ai-picture-upscaler.p.rapidapi.com/supersize-image',
      headers: {
        'X-RapidAPI-Key': '943dc3731fmsh2d651cf1fe5be79p111505jsn71351ad53a18',
        'X-RapidAPI-Host': 'ai-picture-upscaler.p.rapidapi.com',
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});