import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'

// Modal Component for displaying enlarged image
const Modal = ({ image, onClose }) => {
  if (!image) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg text-gray-700">
          &times;
        </button>
        <img
          src={image}
          alt="Expanded"
          className="max-w-full max-h-full cursor-pointer"
          onClick={onClose} // Close modal when image is clicked
        />
      </div>
    </div>
  )
}

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState([])
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)) // Default to today's date
  const [isHovered, setIsHovered] = useState(-1)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null) // State for selected image

  // Load entries from local storage
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || []
    setEntries(storedEntries)
  }, [])

  // Save entries to local storage
  const saveEntriesToLocalStorage = entries => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!title || !text) return

    const newEntry = { title, text, images, date } // Include date in the new entry
    const updatedEntries = [...entries, newEntry]

    setEntries(updatedEntries)
    saveEntriesToLocalStorage(updatedEntries)
    resetForm()

    // Close the form after submission
    setShowForm(false)
  }

  const resetForm = () => {
    setTitle('')
    setText('')
    setImages([])
    setDate(new Date().toISOString().substring(0, 10)) // Reset date to today
  }

  const handleDelete = index => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter((_, i) => i !== index)
      setEntries(updatedEntries)
      saveEntriesToLocalStorage(updatedEntries)
    }
  }

  const handleImageChange = e => {
    const files = Array.from(e.target.files)
    const fileReaders = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result) // Add the image URL to the images array
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(fileReaders).then(urls => {
      setImages(urls) // Update state with array of image URLs
    })
  }

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index) // Toggle the expanded state
  }

  const handleImageClick = img => {
    setSelectedImage(img) // Set the selected image for expansion
  }

  const closeModal = () => {
    setSelectedImage(null) // Close the modal
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Journal Entries</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 bg-primary text-white rounded-full p-2 mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> {showForm ? 'Hide Form' : 'Add Entry'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 border rounded-lg shadow-lg bg-white flex flex-col gap-4"
        >
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-gray-300 rounded-lg p-2"
          />
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your journal entry here..."
            className="border border-gray-300 rounded-lg p-2 h-32"
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)} // Handle date change
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            multiple // Allow multiple file uploads
            className="border border-gray-300 rounded-lg p-2"
          />
          {images.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Entry Preview ${index}`}
                  className="h-24 w-24 object-cover rounded-lg m-1 cursor-pointer"
                  onClick={() => handleImageClick(img)} // Click to expand image
                />
              ))}
            </div>
          )}
          <button type="submit" className="bg-accent text-white rounded-lg py-2">
            Add Entry
          </button>
        </form>
      )}

      {entries.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {entries.map((entry, index) => (
            <div key={index} className="relative">
              <div
                className={`border rounded-lg shadow-md p-4 bg-white flex flex-col ${expandedIndex === index ? 'h-screen overflow-auto' : 'h-auto'}`}
                onMouseEnter={() => setIsHovered(index)} // Show delete icon on hover
                onMouseLeave={() => setIsHovered(-1)} // Hide delete icon on mouse leave
              >
                <h3
                  className="text-lg font-bold cursor-pointer"
                  onClick={() => toggleExpand(index)} // Expand/collapse on title click
                >
                  {entry.title}
                </h3>
                <hr className="w-full mt-2 mb-2 bg-gray-500" />
                <p className="text-sm text-gray-500">{entry.date}</p> {/* Display the date */}
                <p className="p-1">{entry.text}</p>
                {entry.images.length > 0 && ( // Display all images for the entry
                  <div className="flex flex-wrap mt-2">
                    {entry.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Entry Image ${imgIndex}`}
                        className="h-24 w-24 object-cover rounded-lg m-1 cursor-pointer"
                        onClick={() => handleImageClick(img)} // Click to expand image
                      />
                    ))}
                  </div>
                )}
                {isHovered === index && ( // Show delete button only when hovered
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for expanded image */}
      <Modal image={selectedImage} onClose={closeModal} />
    </div>
  )
}

export default Journal
