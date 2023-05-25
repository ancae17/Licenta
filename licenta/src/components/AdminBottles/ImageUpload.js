import { Button } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { MdModeEdit } from "react-icons/md"



function ImageUpload (props, { onImageUpload }) {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const filePickerRef = useRef();

    function pickedHandler (event){
        let pickedFile;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
        }
    }

    function pickedImageHandler(){
        filePickerRef.current.click();
    }

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload=()=>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    return (
        <div className="form-control center">
            <input
                id={props.id} 
                ref={filePickerRef} 
                style={{display: "none"}} 
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={pickedHandler} 
            />
            <div className={'image-upload ${props.center && "center"}'}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl && (
                        <div className="center">
                            <Button 
                                className="image-upload-button" 
                                type="button"
                                onClick={pickedImageHandler}>+</Button>
                        </div>
                    )}
                    <div>
                    {previewUrl && (
                        <div className="center">
                            <Button 
                                className="image-upload-button" 
                                type="button"
                                onClick={pickedImageHandler}>
                                    <MdModeEdit className="icon"></MdModeEdit>
                            </Button>
                        </div>
                    )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ImageUpload;