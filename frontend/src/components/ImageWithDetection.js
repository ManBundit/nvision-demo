import { useEffect, useState, useCallback } from 'react'

export default function ImageWithDetection({ detectedObjects = [], name, data, type }) {  
  const [image, setImage] = useState(); 

  const addDetectionToImage = useCallback(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    let img = new Image(); 
    img.onload = function(){
      const pixels = (img.width + img.height) / 2
      canvas.width = img.width
      canvas.height = img.height
      context.drawImage(img, 0, 0, img.width, img.height)
      detectedObjects.forEach((object) => {
        const {left, right, top, bottom} = object.boundingBox
        const borderWidth = pixels * 0.012
        const fontSize = pixels * 0.05        
        const width = right - left
        const height =  bottom - top
        context.beginPath()
        context.lineWidth = borderWidth
        context.strokeStyle = "red"
        context.rect(left, top, width, height)        
        context.stroke()                
        
        const font = `${fontSize}px Arial`
        const label = `${object.name} ${(object.confidence * 100).toFixed(2)}%`
        context.font = font
        context.textBaseline = 'top'
        context.fillStyle = 'red'
        const { width: textWidth } = context.measureText(label)               
        context.fillRect(Math.max(left - borderWidth, 0), Math.max(top - parseInt(fontSize, 10), 0), textWidth + borderWidth, fontSize);                
        context.fillStyle = 'white'
        context.fillText(label, Math.max(left, 0), Math.max(top - parseInt(fontSize, 10), 0))     
      })
      setImage(canvas.toDataURL(type))
    };
    img.src = data    
  }, [data, type, detectedObjects, setImage])

  useEffect(() => {
    addDetectionToImage()
  }, [addDetectionToImage]);

  return (    
    <img src={image} alt={name} />    
  )
}