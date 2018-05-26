
var path = require("path");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;var Image= require('../models/Image');
var Image= require('../models/Image');
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
//                 'https://www.googleapis.com/auth/drive',
//                 'https://www.googleapis.com/auth/drive.file',
//                 'https://www.googleapis.com/auth/drive.metadata.readonly',
//                 'https://www.googleapis.com/auth/drive.metadata',
//                 'https://www.googleapis.com/auth/drive.photos.readonly',
//                 'https://www.googleapis.com/auth/drive.appdata',
//                 ];

const SCOPES = "https://www.googleapis.com/auth/drive";
                
const TOKEN_PATH = 'credentials.json';
var completedCalls=0;
var fileArr=[];
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var multer = require("multer");
var upload = multer({dest: "./uploads"});
var GoToDrive= require('../models/outfit');
var fileobj={};


module.exports=function(app){
  

app.get("/photos",function(req,res){
  fileArr=[];

 
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
       GoToDrive.authorize(JSON.parse(content), listFiles);
  });


  function listFiles(auth) {
   var fileId='0B7n3Rfab55rPN0V4eGhyYzM3LXc';

    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
       fileId: fileId,
       link:"https://drive.google.com/drive/u/0/mobile/folders/"+fileId,
       fields: 'nextPageToken, files(id, name, parents, mimeType, modifiedTime)',
       q: `'${fileId}' in parents`,
       mimeType: 'mimeType != application/vnd.google-apps.folder',
    }, (err, {data}) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
             fileobj={
              fileId:file.id,
              name:file.name,
              mimeType:file.mimeType
            }
          
            fileArr.push(fileobj)
        });
            console.log(files)
           // res.send(files)
      } 

      else {
        console.log('No files found.');
      }
    });
  }

})






///////////////////OUTFITS PAGE
// app.get("/index1", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/index1.html"));

// });

// app.get("/mobile", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/mobile.html"));
// });



}////MODULE END///////

