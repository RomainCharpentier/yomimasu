import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import styles from '../common.scss';

function Dropzone() {

    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles);
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Déposer les fichiers ici ... {files.map(file => <p>{file.name}</p>)}</p> :
            <p>Glisser et déposer ou cliquer pour sélectionner des fichiers {files.map(file => <p>{file.name}</p>)}</p>
        }
      </div>
    )
}

export default Dropzone;