import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

const UploadButton = ({ className = '' }) => {
  const fileInputRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle button click to trigger file input
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setIsLoading(true); // Set loading state when starting to read the file
      readExcelFile(file);
    } else {
      alert('Please upload a valid Excel file (.xlsx)');
    }
  };

  // Function to read and parse the Excel file
  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(sheetData);
      setIsLoading(false); // Reset loading state after reading the file
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to handle file removal
  const handleRemoveFile = () => {
    setExcelData([]); // Clear the displayed data
    fileInputRef.current.value = null; // Reset the file input value
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`${isLoading ? 'bg-accent' : 'bg-primary'} rounded-md w-100 px-4 py-3 text-white hover:bg-accent transition-ease ${className}`}
      >
        {isLoading ? "Loading..." : "Upload Excel File"}
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Display the Excel data */}
      {excelData.length > 0 && (
        <div>
          <table style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {excelData[0].map((col, index) => (
                  <th key={index} style={{ border: '1px solid black', padding: '8px' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <button 
            onClick={handleRemoveFile} 
            className="mt-4 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-ease"
          >
            Remove File
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
