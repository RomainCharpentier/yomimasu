import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone() {

    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles);
    }, []);

    const test = useCallback(() => {
        console.log(`hey ${files}`);
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='dropzone'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <React.Fragment>
                        <p>Déposer les fichiers ici ...</p>
                        {files.map((file, index) => <p key={index}>{file.name}</p>)}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p>Glisser et déposer ou cliquer pour sélectionner des fichiers </p>
                        {files.map((file, index) => <p key={index}>{file.name}</p>)}
                        <button onClick={test}>test</button>
                    </React.Fragment>
            }
        </div>
    )
}

export default Dropzone;