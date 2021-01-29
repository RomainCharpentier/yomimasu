import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

const ImageInput = ({ action, width, height }) => {
    const [upImg, setUpImg] = useState(null);
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1/1 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    const onSelectFile = useCallback((e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
            setOpenPopup(true);
        }
    });

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!imgRef.current) {
            return;
        }

        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            width,
            height
        );
        ctx.fill();

        setFileUrl(canvas.toDataURL('image/jpeg', 0.6));
    }, [completedCrop]);

    return (
        <div>
            <input type='file' accept='image/*' onChange={onSelectFile} />
            <Popup
                modal 
                open={openPopup}
                onClose={() => {
                    setOpenPopup(false);
                    action(fileUrl);
                }}
            >
                <ReactCrop
                    circularCrop 
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={setCrop}
                    onComplete={setCompletedCrop}
                />
                <Button
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() => {
                        setOpenPopup(false);
                        action(fileUrl);
                    }}
                >
                    Accepter
                </Button>
            </Popup>
        </div>
    );
}

ImageInput.defaultProps = {
    action: "",
    width: 300,
    height: 300
}

ImageInput.propTypes = {
    action: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number
}

export default ImageInput;