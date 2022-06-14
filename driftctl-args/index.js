const core = require('@actions/core');
const aws = require('aws-sdk');

try {
  const bucket = core.getInput('state-bucket')
  const pathFilter = core.getInput('path-filter')
  const awsRegion = core.getInput('aws-region')
  const extraArgs = core.getInput('arguments')
  // const bucket = 'aws-wmto-platform-video-dev.terraform.us-east-1';
  // const pathFilter = 'plato-glass-cloud'
  // const awsRegion = 'us-east-1'
  // const extraArgs = '--only-unmanaged --tf-provider-version 4.12.1'
  // var credentials = new aws.SharedIniFileCredentials({profile: 'plt-dev'});
  // aws.config.credentials = credentials;

  aws.config.update({region: awsRegion});
  s3 = new aws.S3({apiVersion: '2006-03-01'});

  var bucketParams = {
    Bucket: bucket
  }

  var keys = [];

  var objects = s3.listObjects(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
    for (let object in objects.response.data.Contents) {
        if (objects.response.data.Contents[object].Key.includes(pathFilter)) {
          keys.push(objects.response.data.Contents[object].Key)
        }
      }
    }
    var output = "";
    if (extraArgs != "") {
      output += extraArgs + " "
    }
    for (let stateFile in keys) {
      output += "--from tfstate+s3://" + bucket + "/" + keys[stateFile] + " "
    }
    console.log(output)
    core.setOutput('args', output)
  });
} catch (error) {
  core.setFailed(error.message);
}
