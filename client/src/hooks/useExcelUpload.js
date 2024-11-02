import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

export const useExcelUpload = onDataLoaded => {
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const readExcelFile = file => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        onDataLoaded?.(sheetData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error parsing Excel file:', error)
        setIsLoading(false)
      }
    }

    reader.onerror = () => {
      console.error('Error reading file')
      setIsLoading(false)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file && file.name.endsWith('.xlsx')) {
      setIsLoading(true)
      readExcelFile(file)
    } else {
      alert('Please upload a valid Excel file (.xlsx)')
    }
  }

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  return {
    isLoading,
    fileInputRef,
    handleFileChange,
    clearFile,
  }
}
