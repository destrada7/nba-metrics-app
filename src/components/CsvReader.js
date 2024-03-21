import React from 'react';

const CSVFileUploader = () => {
  const handleFiles = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      getAsText(files[0]);
    }
  };

  const getAsText = async (fileToRead) => {
    try {
      const response = await fetch(`/data/MOCK_DATA_POISE.csv`);
      const csv = await response.text();
      processData(csv);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const processData = (csv) => {
    const allTextLines = csv.split(/\r\n|\n/);
    const lines = allTextLines.map((data) => data.split(';'));

    console.log(lines);
  };

  return (
    <input
      type="file"
      onChange={handleFiles}
      accept=".csv"
    />
  );
};

export default CSVFileUploader;