# WordCloud Generator Component

A reusable React component for generating word clouds from text using your API.

## Installation

Copy the `WordCloudGenerator.jsx` component to your project.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Basic Usage

```jsx
import WordCloudGenerator from './components/WordCloudGenerator'
import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  return (
    <div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <WordCloudGenerator text={text} />
    </div>
  )
}
```

## Auto-Generate Mode

```jsx
<WordCloudGenerator 
  text="Your text here"
  autoGenerate={true}  // Automatically generates when text changes
/>
```

## Headless Mode (No UI)

```jsx
<WordCloudGenerator 
  text="Your text here"
  showImage={false}  // Returns null, only triggers callbacks
  onSuccess={(imageUrl) => {
    // Handle the generated image URL
    setMyImageUrl(imageUrl)
  }}
/>
```

## Advanced Usage

```jsx
import WordCloudGenerator from './components/WordCloudGenerator'
import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  const handleError = (error) => {
    console.error('Word cloud error:', error)
    // Show error message to user
  }

  const handleSuccess = (imageUrl) => {
    console.log('Word cloud generated:', imageUrl)
    // Analytics tracking, success message, etc.
  }

  return (
    <div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      
      <WordCloudGenerator 
        text={text}
        apiEndpoint="https://your-api-endpoint.com/api/wordcloud/advanced"
        width={1200}
        height={800}
        backgroundColor="#ffffff"
        colorScheme={[
          "#ff6b6b",
          "#4ecdc4", 
          "#45b7d1",
          "#96ceb4",
          "#feca57",
          "#ff9ff3"
        ]}
        className="custom-wordcloud"
        onError={handleError}
        onSuccess={handleSuccess}
        autoGenerate={true}
        showImage={true}
      />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | `''` | **Required** - The text to generate word cloud from |
| `apiEndpoint` | string | `'http://wordcloud.simonrundell.com:3000/api/wordcloud/advanced'` | API endpoint for word cloud generation |
| `width` | number | `800` | Width of generated word cloud |
| `height` | number | `600` | Height of generated word cloud |
| `backgroundColor` | string | `"#000000"` | Background color of word cloud |
| `colorScheme` | array | See component | Array of color hex codes for words |
| `className` | string | `""` | CSS class name for styling |
| `onError` | function | `null` | Callback function when error occurs |
| `onSuccess` | function | `null` | Callback function when word cloud is generated |
| `showImage` | boolean | `true` | Whether to display the generated image |
| `autoGenerate` | boolean | `false` | Whether to auto-generate when text changes |

## Usage Patterns

### 1. Manual Trigger (Default)
User clicks "Generate Word Cloud" button to create image.

### 2. Auto-Generate
Automatically generates word cloud when text prop changes.

### 3. Headless Mode
Component processes text and calls callbacks but doesn't render UI.

## Features

- ✅ Text processing (word counting, cleaning)
- ✅ Input validation (prevents empty submissions)
- ✅ Loading states with visual feedback
- ✅ Error handling with callbacks
- ✅ Success callbacks with image URL
- ✅ Auto-generation option
- ✅ Headless mode for custom UI
- ✅ Responsive image display
- ✅ Fully configurable styling and API

## API Requirements

Your API endpoint should:
- Accept POST requests
- Expect JSON body with `words` array and `options` object
- Return image blob/binary data
- Support CORS for browser requests

Example expected JSON payload:
```json
{
  "words": [
    {"text": "hello", "value": 5},
    {"text": "world", "value": 3}
  ],
  "options": {
    "width": 800,
    "height": 600,
    "backgroundColor": "#000000",
    "colorScheme": ["#e74c3c", "#3498db", "#2ecc71"]
  }
}
```
