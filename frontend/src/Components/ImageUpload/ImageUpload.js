import {useState, Component} from 'react';
import { render } from 'react-dom';
import './ImageUpload.css'
import AWS from 'aws-sdk'

class ImageUpload extends Component {
    state = {
        selectedFile: null,
        progress: 0,
        status: "Add a File"
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => { 
        AWS.config.update({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            region: process.env.REACT_APP_AWS_REGION
          })   
        this.myBucket = new AWS.S3({
            params: { Bucket: 'pryac'},
            region: 'us-west-1',
          })
          const params = {
            ACL: 'bucket-owner-full-control',
            Key: this.state.selectedFile.name,
            ContentType: this.state.selectedFile.type,
            Bucket: 'pryac',
            Body: this.state.selectedFile,
          }
          this.myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
            var progressBar = document.getElementById("myBar");
            var file = document.getElementById("myFile").files[0];
            var uniqueFileName = 'SampleFile'; 
            let fileUpload = {
              id: "",
              name: file.name,
              nameUpload: uniqueFileName,
              size: file.size,
              type: "",
              timeReference: 'Unknown',
              progressStatus: 0,
              displayName: file.name,
              status: 'Uploading..',
            }
                let progressPercentage = Math.round(evt.loaded / evt.total * 100);
                console.log(progressPercentage);
                progressBar.style.width = progressPercentage + "%";
                if (progressPercentage < 100) {
                  fileUpload.progressStatus = progressPercentage;
                  progressBar.style.color = "Red";
                } else if (progressPercentage == 100) {
                  fileUpload.progressStatus = progressPercentage;
                  progressBar.style.color = "Green";
                  fileUpload.status = "Success!";
                }
                progressBar.innerText = fileUpload.status;
            })
            .send((err) => {
               if (err) {
                var progressBar = document.getElementById("myBar");
                progressBar.innerText = "Failure";
                 console.log("error")
                 console.log(err)
               }
            })
    }

    render() {
        return (
            <div className="ImageUpload">
                <input id="myFile" type="file" onChange={this.fileSelectedHandler}/>
                <div id="uploadButton">
                    <input id="uploadButton" type="button" value="Upload" onClick={this.fileUploadHandler}></input>
                    <p id="myBar"></p>
                </div>
            </div>
        );
    }
}

export default ImageUpload