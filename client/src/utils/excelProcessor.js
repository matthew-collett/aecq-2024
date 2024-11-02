// utils/excelProcessor.js

// Helper function to calculate grid position based on data values
const calculateGridPosition = (row, maxValues) => {
  // Example calculation - adjust based on your needs
  return {
    x: Math.floor((row.value / maxValues.value) * 12), // Scale to 12 columns
    y: Math.floor(row.index / 3), // 3 items per row
    width: Math.max(2, Math.ceil((row.value / maxValues.value) * 4)), // Width between 2-4
    height: Math.max(2, Math.ceil((row.importance / maxValues.importance) * 3)), // Height between 2-3
  }
}

export const processExcelData = excelData => {
  // Skip header row
  const dataRows = excelData.slice(1)

  // Find maximum values for scaling
  const maxValues = dataRows.reduce(
    (acc, row) => ({
      value: Math.max(acc.value, row[1] || 0), // Assuming value is in column 2
      importance: Math.max(acc.importance, row[2] || 0), // Assuming importance is in column 3
    }),
    { value: 0, importance: 0 },
  )

  // Process each row into a grid item
  return dataRows.map((row, index) => {
    const position = calculateGridPosition(
      {
        value: row[1],
        importance: row[2],
        index,
      },
      maxValues,
    )

    return {
      id: index.toString(),
      title: row[0], // Assuming title is in column 1
      content: `Value: ${row[1]}, Importance: ${row[2]}`,
      ...position,
    }
  })
}
