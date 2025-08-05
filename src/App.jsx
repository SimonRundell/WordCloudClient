import './App.css'
import WordCloudGenerator from './components/WordCloudGenerator'
import { useState, useEffect } from 'react'
import { message } from 'antd'

function App() {
  const [text, setText] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [sendSuccessMessage, setSendSuccessMessage] = useState(false);
  const [sendErrorMessage, setSendErrorMessage] = useState(false);

  useEffect(() => {
    if (sendSuccessMessage) {
      messageApi.success('Word cloud generated successfully');
      setSendSuccessMessage(false);
    }
    if (sendErrorMessage) {
      messageApi.error('Error generating word cloud');
      setSendErrorMessage(false);
    }
  }, [sendSuccessMessage, sendErrorMessage, messageApi]);


  const handleError = (error) => {
    console.error('Word cloud error:', error)
    setSendErrorMessage('Error: ' + error)
  }

  const handleSuccess = () => {
    setSendSuccessMessage('Word cloud generated successfully')
  }

  return (
    <div className="App">
      {contextHolder}

      <h1>WordCloud Client</h1>
      
      <textarea 
        placeholder="Type your text here..." 
        onChange={(e) => setText(e.target.value)} 
        value={text} 
        rows="10" 
        cols="50"
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <WordCloudGenerator 
        text={text}
        onError={handleError}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default App
