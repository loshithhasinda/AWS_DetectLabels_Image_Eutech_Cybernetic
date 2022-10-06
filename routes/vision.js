var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");

router.post("/classify", function (req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let responses = []; // Save labels getting from API
  let error = "Error! Labels not Found";

  // Your code starts here //

  const photo = req.files.file.data; // data of the image

  // Config AWS connection
  AWS.config.update({
    accessKeyId: "AKIARAR74F5B2ZJFROOU",
    secretAccessKey: "58t6FYfBVhi0FhEKFwxOWExsgASY3dtg6EHAPcVP",
    region: "ap-southeast-1",
  });

  const params = {
    Image: {
      Bytes: photo,
    },
    MaxLabels: 10,
  };

  const client = new AWS.Rekognition();

  // Call DetectLabels function
  client.detectLabels(params, function (err, response) {
    if (err) {
      console.log(err, err.stack); 
      // if an error occurred
      res.status(400).json({
        labels: error,
        error: "Unable to process the request",
      });
    } else {
      response.Labels.forEach((label) => {
        responses.push(label.Name);
      });
      res.status(200).json({
        labels: responses,
      });
    }
  });

  // Your code ends here //
});

module.exports = router;
