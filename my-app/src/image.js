const fs = require('fs');
const path = require('path');

// Path to the folder containing the images
const folderPath = './assets/images';

// Read the files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter the files to include only image files (e.g., .png, .jpg, .jpeg, etc.)
  const imageFiles = files.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(extension);
  });

  // Create an array of image file names
  const imageNames = imageFiles.map((file) => path.basename(file));

  // Create a JSON object with the image names
  const jsonData = { images: imageNames };

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Write the JSON string to a file
  const outputFilePath = './data/shoes.json';
  fs.writeFile(outputFilePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('JSON file created successfully:', outputFilePath);
  });
});
