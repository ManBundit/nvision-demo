import styles from 'styles/components/custom-uploader.module.scss'
import { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { readFile } from 'utils/readFile'

export default function CustomUploader({onUpload, onSuccess, onFailure}) {  
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp']  
  const [isUploading, setIsUploading] = useState(false)  
  const [isDragOver, setIsDragOver] = useState(false)    
  const input = useRef()
  let tempFiles = []
  const handleDrag = (event) => {        
    event.stopPropagation()
    event.preventDefault()
    if (['dragover', 'dragenter'].includes(event.type)) {
      setIsDragOver(true)
    } else {
      setIsDragOver(false)
    }
    if (event.type === 'drop'){
      handleUpload(event)
    }
  }
  const handleClick = () => {
    input.current.click()
  }
  const handleUpload = async (event) => {         
    onUpload()
    setIsUploading(true)
    let selectedFile = event?.target?.files || event?.dataTransfer?.files;        
    for (let i in selectedFile) {
      if (selectedFile[i].type && allowedFileTypes.includes(selectedFile[i].type)) {        
        const file = await readFile(selectedFile[i])
        tempFiles.push({
          name: selectedFile[i].name,
          type: selectedFile[i].type,
          size: selectedFile[i].size,
          data: file
        })
      }
    }            
    if(tempFiles.length) {                  
      onSuccess([
        ...tempFiles        
      ])
      tempFiles = []      
    } else {
      onFailure({
        reason: 'file is not support'
      })
    }
    input.current.value = ''
    setIsUploading(false)         
  }
  return (    
    <div className={
      `${styles.customUploader}
       ${isUploading ? styles.uploading : ''}
       ${isDragOver ? styles.dragOver : ''}
      `
    }>
      <div 
        className={styles.uploadArea}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrag}
        onClick={handleClick}
      >
        <span className={styles.text}>
          { !isDragOver ? 'Drag any image file here or click to upload' : 'Drop file here'}
        </span>
      </div>
      <input ref={input} multiple accept={allowedFileTypes.join(',')} type="file" onChange={handleUpload}/>      
    </div>    
  )
}

CustomUploader.propType = {
  onUpload: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func
}

CustomUploader.defaultProps = {
  onUpload: (data) => {},
  onSuccess: (data) => {},
  onFailure: (data) => {}
}