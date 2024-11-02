import React, { useState, useEffect } from 'react'
import { GridStackWrapper, GridItem } from '@components/GridStackWrapper'
import axios from 'axios'

const Prediction = () => {
  const [gridItems, setGridItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAndRotateCrops = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:3000/api/plant')
        const rotatedItems = rotateItemsCircularly(response.data)
        setGridItems(rotatedItems)
      } catch (error) {
        console.error('Error fetching rotational crops:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndRotateCrops()
  }, [])

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const rotateItemsCircularly = items => {
    if (items.length === 0) return items

    // Copy the grid items to avoid mutating the original array
    const rotatedItems = [...items]

    // Store the last item's position
    const lastItemPosition = {
      x: rotatedItems[rotatedItems.length - 1].x,
      y: rotatedItems[rotatedItems.length - 1].y,
    }

    // Shift each item to the next position
    for (let i = rotatedItems.length - 1; i > 0; i--) {
      rotatedItems[i].x = rotatedItems[i - 1].x
      rotatedItems[i].y = rotatedItems[i - 1].y
    }

    // Place the last item at the first item's original position
    rotatedItems[0].x = lastItemPosition.x
    rotatedItems[0].y = lastItemPosition.y

    return rotatedItems
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
        <h2 className="text-2xl">Crop Rotation Prediction</h2>
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
            <p className="text-lg mb-2">No rotational crops available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Prediction
