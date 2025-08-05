import { useState, useEffect, useCallback } from 'react'

const WordCloudGenerator = ({ 
  text = '',
  apiEndpoint = 'http://wordcloud.simonrundell.com:3000/api/wordcloud/advanced',
  width = 800,
  height = 600,
  backgroundColor = "#000000",
  colorScheme = [
    "#e74c3c",
    "#3498db", 
    "#2ecc71",
    "#f1c40f",
    "#9b59b6",
    "#34495e"
  ],
  className = "",
  onError = null,
  onSuccess = null,
  showImage = true,
  autoGenerate = false
}) => {
  const [cloudData, setCloudData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateCloud = useCallback(async (inputText) => {
    if (!inputText || !inputText.trim()) {
      if (onError) onError('Please provide text to generate a word cloud')
      return null
    }

    setIsLoading(true)
    
    try {
      // Clean and process text
      const cleanedText = inputText.replace(/[^\w\s]/g, '').toLowerCase();
      const words = cleanedText.split(/\s+/).filter(Boolean);

      // Count word occurrences
      const wordCount = {};
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      // Prepare payload for API
      const jsonBody = {
        words: Object.entries(wordCount).map(([word, count]) => ({
          text: word,
          value: count
        })),
        options: {
          width,
          height,
          backgroundColor,
          colorScheme
        }
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setCloudData(imageUrl);
      
      if (onSuccess) onSuccess(imageUrl)
      return imageUrl
    } catch (error) {
      console.error('Error generating word cloud:', error);
      setCloudData(null);
      if (onError) onError(error.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [apiEndpoint, width, height, backgroundColor, colorScheme, onError, onSuccess]);

  // Auto-generate when text changes (if autoGenerate is true)
  useEffect(() => {
    if (autoGenerate && text && text.trim()) {
      generateCloud(text)
    }
  }, [text, autoGenerate])

  // If not showing the image, return null (headless mode)
  if (!showImage) {
    return null
  }

  if (isLoading) {
    return (
      <div className={`word-cloud-generator ${className}`}>
        <div>Generating word cloud...</div>
      </div>
    )
  }

  if (cloudData) {
    return (
      <div className={`word-cloud-result ${className}`}>
        <img src={cloudData} alt="Generated Word Cloud" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    )
  }

  return (
    <div className={`word-cloud-generator ${className}`}>
      <button 
        onClick={() => generateCloud(text)}
        disabled={isLoading || !text.trim()}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: !text.trim() ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: !text.trim() ? 'not-allowed' : 'pointer'
        }}
      >
        Generate Word Cloud
      </button>
    </div>
  )
}

export default WordCloudGenerator
