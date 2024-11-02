import React, { useState, useEffect } from 'react'
import { GridStackWrapper, GridItem } from '@components/GridStackWrapper'
import UploadButton from '@components/UploadButton'
import axios from 'axios'

const Dashboard = () => {
  const [gridItems, setGridItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Add useEffect to fetch data on mount
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:3000/api/plant')
        setGridItems(response.data)
      } catch (error) {
        console.error('Error fetching plants:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlants()
  }, []) // Empty dependency array means this runs once on mount

  // Helper function to format dates
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const CROP_DENSITIES = {
    'Legumes': 2.5,
    'Leafy Vegetables': 3,
    'Solanaceous Crops': 4,
    'Root Vegetables': 5,
    'Cereals': 1.5,
  }

  const processExcelData = data => {
    const dataRows = data.slice(1)

    const maxArea = Math.max(
      ...dataRows.map(row => {
        const category = row[0]
        const quantity = parseFloat(row[1])
        const density = CROP_DENSITIES[category] || 3
        return quantity / density
      }),
    )

    return dataRows.map((row, index) => {
      const category = row[0]
      const quantity = parseFloat(row[1])
      const density = CROP_DENSITIES[category] || 3

      const area = quantity / density
      const scaleFactor = Math.sqrt(area / maxArea) * 8
      const size = Math.max(2, Math.round(scaleFactor))

      const itemsPerRow = 3
      const x = (index % itemsPerRow) * 4
      const y = Math.floor(index / itemsPerRow) * 4

      // Parse dates to ensure correct format
      const plantBy = new Date(row[2]).toISOString().split('T')[0]
      const harvestBy = new Date(row[3]).toISOString().split('T')[0]

      return {
        id: row[0],
        quantity: row[1],
        plantBy,
        harvestBy,
        x: x,
        y: y,
        width: size,
        height: size,
      }
    })
  }

  const saveItemsToDatabase = async items => {
    try {
      const savePromises = items.map(item =>
        axios.post('http://localhost:3000/api/plant', {
          id: item.id,
          quantity: item.quantity,
          plantBy: item.plantBy,
          harvestBy: item.harvestBy,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
        }),
      )

      await Promise.all(savePromises)
      console.log('All items saved successfully')
    } catch (error) {
      console.error('Error saving items:', error)
      throw error
    }
  }

  const handleDataLoaded = async excelData => {
    try {
      setIsLoading(true)
      const items = processExcelData(excelData)
      await saveItemsToDatabase(items)
      setGridItems(items)
    } catch (error) {
      console.error('Error processing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const options = {
    column: 12,
    minRow: 2,
    margin: 10,
    disableOneColumnMode: false,
    float: true,
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full py-3 justify-between items-center">
        <h2 className="text-2xl">My Crops</h2>
        <UploadButton onDataLoaded={handleDataLoaded} buttonText="Upload Crop Data" />
      </div>
      <div className="bg-white rounded-md shadow flex-grow flex border border-primary">
        {isLoading ? (
          <div className="flex items-center justify-center w-full">Loading...</div>
        ) : gridItems.length > 0 ? (
          <GridStackWrapper options={options} className="flex-grow w-full h-full">
            {gridItems.map(item => (
              <GridItem
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                className="flex justify-center items-center"
              >
                <div className="p-2">
                  <h3 className="font-bold">{item.id}</h3>
                  <p>Quantity: {item.quantity}kg</p>
                  <p>Plant by: {formatDate(item.plantBy)}</p>
                  <p>Harvest by: {formatDate(item.harvestBy)}</p>
                </div>
              </GridItem>
            ))}
          </GridStackWrapper>
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-gray-500">
            <p className="text-lg mb-2">No crops added yet</p>
            <p className="text-sm">Upload an Excel file to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
