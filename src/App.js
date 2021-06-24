import React, { useState } from 'react';
import './App.css';
import imageCompression from 'browser-image-compression';


const App = () => {
  const [inputUrl, setInputUrl] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)

  const handleImageUpload = async (event) => {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    setInputUrl(URL.createObjectURL(imageFile));

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      setOutputUrl(URL.createObjectURL(compressedFile))

      // await uploadToServer(compressedFile); // write your own logic
      console.log('send to server logic')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="App">
      <div>
        <label htmlFor="web-worker">
          Compress my image
          <input
              id="web-worker"
              type="file"
              accept="image/*"
              onChange={e => handleImageUpload(e)}
          />
        </label>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <td>input preview</td>
            <td>output preview</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><img src={inputUrl} alt="input" /></td>
            <td><img src={outputUrl} alt="output" /></td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
