import React from 'react'

const CropInfo = () => {
  const rotationData = [
    {
      year: 'Year 1: Legumes (Soybeans, Peas)',
      benefits:
        'Legumes fix nitrogen in the soil, enhancing soil fertility and reducing the need for synthetic nitrogen fertilizers.',
      plantingDensity: [
        { crop: 'Soybeans', density: '100,000 - 200,000 plants/acre' },
        { crop: 'Peas', density: '100,000 - 160,000 plants/acre' },
      ],
      futurePlanning:
        'Legumes should be rotated with nutrient-demanding crops (like leafy greens or solanaceous crops) the following year to take advantage of the increased nitrogen levels. Use soybeans for large acreage if aiming for high biomass, while peas can be targeted in smaller sections.',
    },
    {
      year: 'Year 2: Leafy Vegetables (Lettuce)',
      benefits: 'Leafy greens will use the nitrogen fixed by legumes, reducing fertilizer needs.',
      plantingDensity: [{ crop: 'Lettuce', density: '100,000 - 200,000 plants/acre' }],
      futurePlanning:
        'After leafy greens, a deeper-rooted or nutrient-extracting crop like cereals or root vegetables can be planted to utilize deeper soil layers.',
    },
    {
      year: 'Year 3: Solanaceous Crops (Tomatoes)',
      benefits:
        'Solanaceous crops require moderate soil nutrients and will further balance the soil ecosystem after nitrogen-demanding crops like leafy greens.',
      plantingDensity: [{ crop: 'Tomatoes', density: '18,000 - 24,000 plants/acre' }],
      futurePlanning:
        'Tomatoes have a longer growing season, so plan for soil amendments before planting. After harvesting, introduce a cover crop to add organic matter and protect against soil erosion.',
    },
    {
      year: 'Year 4: Root Vegetables (Carrots)',
      benefits:
        'Root crops like carrots help break up soil compaction and allow for better water and nutrient penetration for future crops.',
      plantingDensity: [{ crop: 'Carrots', density: '100,000 - 200,000 plants/acre' }],
      futurePlanning:
        'After root vegetables, another legume crop or leafy vegetable can restart the cycle. Keep root vegetables in smaller, intensively managed plots if aiming for high quantities.',
    },
    {
      year: 'Year 5: Cereals (Wheat)',
      benefits:
        'Cereals use different nutrients and help prevent soil erosion; they also prepare the soil for nitrogen-fixing legumes when the cycle restarts.',
      plantingDensity: [{ crop: 'Wheat', density: '1.2 - 1.5 million seeds/acre' }],
      futurePlanning:
        'Follow wheat with a nitrogen-fixing legume crop to replenish soil nutrients. Consider cover crops in off-seasons to improve soil structure.',
    },
  ]

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Crop Rotation Plan</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {rotationData.map((yearData, index) => (
          <YearSection key={index} {...yearData} />
        ))}
      </div>
    </div>
  )
}

const YearSection = ({ year, benefits, plantingDensity, futurePlanning }) => (
  <div
    style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    }}
  >
    <h2 style={{ color: '#2c3e50', marginTop: 0 }}>{year}</h2>
    <p style={{ lineHeight: 1.5 }}>
      <strong>Benefits:</strong> {benefits}
    </p>
    <div style={{ lineHeight: 1.5 }}>
      <strong>Suggested Planting Density:</strong>
      <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
        {plantingDensity.map((plant, index) => (
          <li key={index}>
            {plant.crop}: {plant.density}
          </li>
        ))}
      </ul>
    </div>
    <p style={{ lineHeight: 1.5 }}>
      <strong>Future Planning:</strong> {futurePlanning}
    </p>
  </div>
)

export default CropInfo
