import { readFile } from 'utils/readFile'
import { useRef, useState, useEffect } from 'react';
import { useAppContext } from 'context/app-context';
import styles from 'styles/components/web-camera.module.scss'

export default function WebCamera({ onCapture = Function }) {
  const video = useRef()
  const [stream, setStream] = useState()
  const { isLoading, setIsLoading } = useAppContext() 

  useEffect(() => {
    if (stream) {
      video.current.srcObject = stream      
    }
  }, [stream])  

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {          
      navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment"
        }
      })
      .then(initVideo)
      .catch(handleInitVideoError)
    }   
  }, [])

  const initVideo = mediaStream => {    
    setStream(mediaStream)    
  }
  const handleInitVideoError = error => {
    console.log(error)
  }
  
  const captureImage = async () => {
    setIsLoading(true)
    let photo = new Blob()
    if ('ImageCapture' in window) {
      const videoTrack = stream.getVideoTracks()[0]
      const imageCapture = new ImageCapture(videoTrack)
      photo = await imageCapture.takePhoto()              
    } else {
      const vidElm = document.createElement('video')
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      vidElm.srcObject = stream;
      photo = await new Promise((resolve, reject) => {
        try {
          vidElm.addEventListener('loadeddata', () => {
            canvas.width = vidElm.videoWidth
            canvas.height = vidElm.videoHeight
            vidElm.play().then(() => {
              ctx.drawImage(vidElm, 0, 0, vidElm.videoWidth, vidElm.videoHeight)
              canvas.toBlob(resolve, 'image/png')
            });
          });
        } catch(error) {      
          reject(error)
        }
      });      
    }
    try {
      const imageData = await readFile(photo)              
      onCapture({
        name: Date.now(),
        type: photo.type,
        size: photo.size,
        data: imageData,
      })
    } catch (error) {
      console.log(error)
    }    
  }
  return (
    <>
      <div className={styles.videoWrapper}>
        <video autoPlay={true} ref={video} />
      </div>            
      <button 
        className={`${styles.takePhotoBtn} ${isLoading || !stream ? styles.disabled : ''}`} 
        onClick={captureImage}>
        Take Photo
      </button>
    </>
  )
}