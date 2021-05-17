import React from "react";
import { useState } from "react"
import S3 from "react-aws-s3";
import AWS from 'aws-sdk'
import './ImageUploadMulti.css'
import _uniqueId from 'lodash/uniqueId';

function ImageUploadMulti(props) {
  const oppId = props.opportunityId;

  const [areUploaded, setUploaded] = useState(false);

  const fileInput = React.useRef();

  const config = {
    bucketName: 'pryac',
    // dirName: "Opportunities" /* optional */,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };
 
  // const params = {
  //   ACL: 'bucket-owner-full-control',
  //   Key: this.state.selectedFile.name,
  //   ContentType: this.state.selectedFile.type,
  //   Bucket: 'pryac',
  //   Body: this.state.selectedFile,
  // }


  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    let fileNames = [];
    for (let i = 0; i < newArr.length; i++) {
        let name = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
        const params = {
          ACL: 'bucket-owner-full-control',
          Key: name,
          ContentType: newArr[i].type,
          Bucket: 'pryac',
          Body: newArr[i],
        }
      fileNames.push(name);
      handleUpload(params);
    }
    props.getFiles(fileNames);
    setUploaded(true);
  };

  const handleUpload = (file) => {
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION
      })   
      var myBucket = new AWS.S3({
        params: { Bucket: 'pryac'},
        region: 'us-west-1',
      })
      myBucket.putObject(file).send((err) => {
        if (err) {
         var progressBar = document.getElementById("myBar");
         progressBar.innerText = "Failure";
          console.log("error")
          console.log(err)
        }
     })
  };

  return (
    <>
      <form className='upload-steps'>
        <label>
        Select all files then click upload:
          <input type='file' multiple ref={fileInput} />
        </label>
        <br />
        <button onClick={handleClick}>Upload Images to Form</button>
        {areUploaded && <label className="sucessMessage">Images Sucessfully Uploaded </label>}
      </form>
    </>
  );
}
export default ImageUploadMulti;