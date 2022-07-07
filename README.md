LAB 17 - Lambda-Upload
========

- Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser
- A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far
When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:
  - Download a file called “images.json” from the S3 Bucket if it exists
  - The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present
  - Create a metadata object describing the image
  Name, Size, Type, etc.
  - Append the data for this image to the array
---------------

### Author: Abdinasir Yussuf

### Links and Resources


- **Example of uploaded image-json**

  - [images.json](https://ay-lab-17-images.s3.us-west-2.amazonaws.com/images.json)






#### `.env` requirements

-   none

#### JSON data added after uploading an Image

    -   Returns Object
        ```
        {
          "name": "PseudoStack.jpg",
          "size": 250929,
          "type": "image/jpg"
        }
        ```

#### Tests

-   testing using AWS debug gui

#### UML - Class example

