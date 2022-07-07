'use strict';

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async (event) => {
  let bucketName = event.Records[0].s3.bucket.name;

  let fileName = event.Records[0].s3.object.key

  const fileSize = event.Records[0].s3.object.size;

  console.log('event: ', bucketName, fileName, fileSize);

  const params = {
    Bucket: bucketName,
    Key: 'images.json',
  }

  try {
    const imageData = await s3.getObject(params).promise();
    let data = JSON.parse(imageData.Body.toString());
    console.log('did this work', data);
    data.push({
      name: fileName,
      size: fileSize, type:
        'image/jpg'
    });

    let dataBody = JSON.stringify(data);

    const newManifest = await s3.putObject({ ...params, Body: dataBody, ContentType: 'application/json' });
    console.log('we are here');
  } catch (e) {
    console.log(e)

    if (e.message === 'The specified key does not exist.') {
      const newManifest = {
        Bucket: bucketName,
        Key: "images.json",
        Body: JSON.stringify([{ name: fileName, size: fileSize, type: 'image/jpg' }]),
        ContentType: 'application/json'
      };
      const mainfest = await s3.putObject(newManifest).promise();
      console.log('JSON file Created for bucket', mainfest)
    }

  }
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};




