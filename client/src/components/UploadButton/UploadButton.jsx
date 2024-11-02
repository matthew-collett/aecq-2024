import React from 'react'
import { useExcelUpload } from '@hooks/useExcelUpload'

const UploadButton = ({
  onDataLoaded,
  className = '',
  buttonText = 'Upload Excel File',
  loadingText = 'Loading...',
}) => {
  const { isLoading, fileInputRef, handleFileChange } = useExcelUpload(onDataLoaded)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`${
          isLoading ? 'bg-accent' : 'bg-primary'
        } rounded-md w-100 px-4 py-3 text-white hover:bg-accent transition-ease ${className}`}
        disabled={isLoading}
      >
        {isLoading ? loadingText : buttonText}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default UploadButton
