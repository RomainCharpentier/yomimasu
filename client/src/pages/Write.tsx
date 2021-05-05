import React, { useState, useCallback } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import useAPIError from '../hooks/useAPIError';
import DropZone from '../components/Dropzone';
import API from '../utils/API';
import styles from '../common.scss';

const writeMode = {
    FILE: 'file',
    TEXT: 'text'
}

export const Write = () => {
    const { addError } = useAPIError();

    const [mode, setMode] = useState(writeMode.TEXT);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState({type: '', path: ''});

    const handleSubmit = event => {
        switch (mode) {
            case writeMode.FILE:
                addError("Méthode pas encore implémentée", 501);
                break;
            case writeMode.TEXT:
                if(title.length === 0){
                    return;
                }
                API.createBook({title: {title}, text: {text}}).then((data) => {
                    window.location = '/book';
                }, (error) => {
                    console.log(error);
                    return;
                });
                break;
            default:
                break;
        }
    }

    const handleFileChange = event => {
        let files = event.target.files;
        console.log(files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = e => {
            console.log(e.target.result);
        };

        let reader2 = new FileReader();
        reader2.readAsText(files[0]);
        reader2.onload = e => {
            console.log(e.target.result);
            setFile({
                type: '',
                path: e.target.result
            })
        };
    }

    const renderSwitch = () => {
        switch (mode) {
            case writeMode.FILE:
                return <DropZone />;
            case writeMode.TEXT:
                return (
                    <div>
                        <FormGroup controlId='title'>
                            <FormLabel>Titre</FormLabel>
                            <FormControl as="textarea" onChange={e => setTitle(e.target.value)}/>
                        </FormGroup>

                        <FormGroup controlId='text'>
                            <FormLabel>Texte</FormLabel>
                            <FormControl as="textarea" rows="3" onChange={e => setText(e.target.value)}/>
                        </FormGroup>
                    </div>
                );
            default:
                return '';
        }
    }
    
    return (
        <div className={styles.Form}>
            <h1>Write</h1>
            {Object.entries(writeMode).map(([key, value]) => <Button key={key} onClick={e => setMode(value)} disabled={mode===value}>{value}</Button>)}
            {renderSwitch()}
            <Button onClick={handleSubmit} block type='submit'>
                Sauvegarde
            </Button>
        </div>
    );
}