import { useState, useEffect, useRef } from 'react';
import { useAppContext } from 'context/app-context'
import CustomTab from 'components/CustomTab';
import CustomUploader from 'components/CustomUploader'
import WebCamera from 'components/WebCamera'
import ImageWithDetection from 'components/ImageWithDetection'
import { postObjectDetection } from 'service/nvision/object-detection.api'

function App() {
  const { isLoading, setIsLoading } = useAppContext()
  const [tab, setTab] = useState(1)
  const [displayImages, setDisplayImages] = useState([])
  const [error, setError] = useState({
    show: false,
    message: 'Error, Something went wrong'
  })  
  const errorTimeout = useRef()
  const tabs = [
    {
      name: 'Upload Image',
      value: 1,
    },
    {
      name: 'Use Webcam',
      value: 2
    }
  ]
  useEffect(() => {
    if (error.show) {
      clearTimeout(errorTimeout.current)
      errorTimeout.current = setTimeout(() => {
        setError({
          ...error,
          show: false
        })
      }, 3000)
    }
  }, [error]);
  const predictImages = async (images = []) => {
    setIsLoading(true)
    let imagesWithDetectedObjects = []
    for (let i in images) {
      try {
        const { data: { data } } = await postObjectDetection({ rawData: images[i].data.split(',')[1] })
        images[i].detectedObjects = data.detectedObjects        
        imagesWithDetectedObjects.push(images[i])
      } catch(error) {     
        setError({
          message: `Error, ${error.message || 'Something went wrong'}`,
          show: true
        })
        continue
      }
    }
    setDisplayImages([
      ...imagesWithDetectedObjects,
      ...displayImages
    ])
    setIsLoading(false)
  }
  const renderTabContent = tab => {
    switch(tab) {
      case 1:
        return <CustomUploader onSuccess={predictImages} />      
      case 2:
        return <WebCamera onCapture={(image) => predictImages([image])} />
      default:
        return ''        
    }
  }
  return (
    <div className={`app-content ${isLoading ? 'loading' : ''}`}>
      <div className={`error ${error.show ? 'show' : ''}`}>
        {error.message}
      </div>
      <div className="wrapper">
        <h1>Object Detection</h1>
        <div className="tab-width">
          <CustomTab tabs={tabs} onTabChange={setTab} activeTab={tab} />
        </div>
          {renderTabContent(tab)}
        <div className="image-list">
          {displayImages.map((image, index) => 
            <div className="wrap-img" key={index}>
              <ImageWithDetection {...image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
