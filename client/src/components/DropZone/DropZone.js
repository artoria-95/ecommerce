import React from 'react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
//import { Image } from 'cloudinary-react';
//import styles from './styles.css'
const CLOUDINARY_NAME = 'gonzaloaguilarm'
const CLOUDINARY_UPDATE_PRESET = 'hd3ecfgr'


const DropZone = () => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [file, setFile] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

    acceptedFiles.forEach(async (acceptedFiles) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles);
      formData.append("upload_preset",
        CLOUDINARY_UPDATE_PRESET
      );

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      const data = await response.json();
      //localStorage.setItem('url', data.url)
      console.log(data.url)
      if (data.url) {
        setImageUploaded(true)
        setFile(String(data.url))
      }
    });
  }, [])

  const { getRootProps, getInputProps, isDragActive, rootRef, inputRef } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false
  })
  console.log('FILEEE', file)

  return (
    <>
      <section className="container">
        <div {...getRootProps({ refKey: 'innerRef' })}>
          <input {...getInputProps()} />
          {
            imageUploaded ?
              <img src={file} alt='image' width="150" height="150" />
              :
              <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
      </section>
    </>
  )
}
export default DropZone;