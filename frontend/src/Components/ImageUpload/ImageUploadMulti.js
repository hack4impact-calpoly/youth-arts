import React, { useState } from "react";

import AWS from "aws-sdk";
import "./ImageUploadMulti.css";

function ImageUploadMulti(props) {
  const [areUploaded, setUploaded] = useState(false);

  const fileInput = React.useRef();

  const handleClick = (event) => {
    event.preventDefault();
    const newArr = fileInput.current.files;
    const fileNames = [];
    for (let i = 0; i < newArr.length; i++) {
      const name =
        Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2);
      const params = {
        ACL: "public-read-write",
        Key: name,
        ContentType: newArr[i].type,
        Bucket: "pryac",
        Body: newArr[i],
      };
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
      region: process.env.REACT_APP_AWS_REGION,
    });
    const myBucket = new AWS.S3({
      params: { Bucket: "pryac" },
      region: "us-west-1",
    });
    myBucket.putObject(file).send((err) => {
      if (err) {
        const progressBar = document.getElementById("myBar");
        progressBar.innerText = "Failure";
        console.log("error");
        console.log(err);
      }
    });
  };

  return (
    <form className="upload-steps">
      <label>
        Select all files then click upload:
        <br />
        <input type="file" multiple ref={fileInput} />
      </label>
      <br />
      <button onClick={handleClick}>Upload Images to Form</button>
      {areUploaded && (
        <label className="sucessMessage">Images Sucessfully Uploaded </label>
      )}
    </form>
  );
}
export default ImageUploadMulti;
