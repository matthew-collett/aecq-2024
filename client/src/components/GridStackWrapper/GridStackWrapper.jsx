// GridStackWrapper.jsx
import React, { useEffect, useRef } from 'react'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

const GridStackWrapper = ({ children, onChange, options = {}, className = '' }) => {
  const gridRef = useRef(null)
  const gridInstanceRef = useRef(null)

  useEffect(() => {
    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      if (gridRef.current && !gridInstanceRef.current) {
        const defaultOptions = {
          cellHeight: 50,
          animate: true,
          float: false,
          column: 12,
          margin: 10,
          minRow: 1,
          resizable: {
            handles: 'all',
          },
          ...options,
        }

        // Initialize GridStack
        gridInstanceRef.current = GridStack.init(defaultOptions, gridRef.current)

        // Add change event listener
        if (onChange) {
          gridInstanceRef.current.on('change', (event, items) => {
            onChange(items)
          })
        }
      }
    }, 0)

    // Cleanup
    return () => {
      clearTimeout(timer)
      if (gridInstanceRef.current) {
        gridInstanceRef.current.destroy(false)
        gridInstanceRef.current = null
      }
    }
  }, []) // Empty dependency array since we only want to initialize once

  // Make sure grid items are wrapped properly
  useEffect(() => {
    if (gridInstanceRef.current) {
      gridInstanceRef.current.makeWidget('.grid-stack-item')
    }
  }, [children])

  return (
    <div className={`grid-stack ${className}`} ref={gridRef}>
      {children}
    </div>
  )
}

// GridItem component for individual grid items
const GridItem = ({ id, x, y, width, height, children, className = '' }) => {
  return (
    <div
      className={`grid-stack-item ${className}`}
      gs-id={id}
      gs-x={x}
      gs-y={y}
      gs-w={width}
      gs-h={height}
    >
      <div className="grid-stack-item-content bg-primary rounded-md">{children}</div>
    </div>
  )
}

export { GridStackWrapper, GridItem }
