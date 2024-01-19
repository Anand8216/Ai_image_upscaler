import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = async () => {
    try {
      if (!selectedFile) {
        console.error('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/upscale', formData);

      // Assuming the response contains the binary image data
      const imageData = response.data;

      // Convert binary image data to base64
      const base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(imageData)));

      // Set the base64 image data to the state
      setUploadedImage(`data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='main-container'>
      <input type='file' onChange={handleFileChange} />
      <button type='button' onClick={handleClick}>
        Submit
      </button>

      {uploadedImage && (
        <div className='uploaded-image-container' width='400px' height='400px'>
          <img src={uploadedImage} alt='Changed Image' />
        </div>
      )}
    </div>
  );
}

export default Home;
