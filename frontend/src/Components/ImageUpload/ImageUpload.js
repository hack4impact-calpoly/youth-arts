import {useState, Component} from 'react';
import {useDropzone} from 'react-dropzone'
import { render } from 'react-dom';
import './ImageUpload.css'

class ImageUpload extends Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => { 
        //Api call
    }

    render() {
        return (
            <div className="ImageUpload">
                <input type="file" onChange={this.fileSelectedHandler}/>
                <div id="uploadButton">
                    <input id="uploadButton" type="button" value="Upload" onClick={this.fileUploadHandler}/>
                </div>
            </div>
        );
    }
}

export default ImageUpload