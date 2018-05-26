
var path = require("path");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const TOKEN_PATH = 'credentials.json';
var fileArr=[];
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var GoToDrive= require('../models/outfit');
var Image= require('../models/Image');
var city;
var state;
const SCOPES = "https://www.googleapis.com/auth/drive";
var callsCompleted=0;            



module.exports=function(app){

app.post("/geo", function(req, res, next){
   city=req.body.city; 
   state=req.body.state
})




//app.post("/upload2", multipartMiddleware, function(req, res, next){
app.post("/upload2", upload.array('file', 4) , function(req, res, next){

var tiempo= new Date();
var date=new Date();
var time= tiempo.toLocaleString('en-us',{hour:'numeric',minute:'numeric',hour12:true})
var date= date.toLocaleString('en-us',{weekday:'long',month:'long',day:'numeric'})
//console.log(date +" " +time)


  
 
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
       GoToDrive.authorize(JSON.parse(content), UploadFiles);
  });



 function UploadFiles(auth) {
const drive = google.drive({version: 'v3', auth});
  // var folderId = '1AM07eNAJz5D4oFa5ZB-0ygOa_tVjoAgR';
  var folderId='0B7n3Rfab55rPN0V4eGhyYzM3LXc';
  for(i=0;i<req.files.length;i++){
    
 (function(i){  

    var fileMetadata = {
      'name': req.files[i].originalname,
       parents: [folderId]
    };
    var media = {
      mimetype: req.files[i].mimetype,
      body: fs.createReadStream(req.files[i].path)
    };

      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
           console.log(err);
        } 
        else {
          if(req.files[i].mimetype==="video/quicktime"){
          
              var NewImage = new Image ({
                  fileId:file.data.id,
                  date: date +" " +time,
                  location: city +" , " +state,
                  link:"https://drive.google.com/file/d/"+file.data.id+"/preview",
                  mimetype:req.files[i].mimetype
                });
                  NewImage.save(function(err,doc){
                      if (err){
                          console.log('err: ' + error);
                          res.json('error: there was an error');
                      }
                      else{
                          fs.unlink(req.files[i].path,function(error){
                              if(error){
                                console.log(error)
                              }
                              
                              if(i==req.files.length-1){
                                  console.log("deleted");
                                  setTimeout(function(){res.redirect("/") }, 1000);
                              }
                          })
                      }
                  })
           }

            else{

              var NewImage = new Image ({
                fileId:file.data.id,
                date: date +" " +time,
                location: city +" , " +state,
                link:"https://lh3.google.com/u/0/d/"+file.data.id+"=w762-h570-p-k-nu-iv1",
                mimetype:req.files[i].mimetype
              });
              NewImage.save(function(err,doc){
                    if (err){
                        console.log('err: ' + error);
                        res.json('error: there was an error');
                    }
                    else{
                        fs.unlink(req.files[i].path,function(error){
                            if(error){
                              console.log(error)
                            }

                            if(i==req.files.length-1){
                                console.log("deleted");
                                console.log(doc)
                                setTimeout(function(){res.redirect("/") }, 1000);
                            } 
                        }) //fs.unlink
                      }  //else line 122
                 }); //.save
              } ///else lne 108
            }  //else line 77
         }) //drive.files.create
      })(i)
    } ///for loop
  }  //function UploadFiles
})  //photos



 
app.get("/location",function(req,res){
  Image.find({}).exec(function(err,doc){  
    if (err) {
     console.log(err)
    }
    else {
      res.send(doc);
      console.log(doc)
    }
  });
})






app.get("/delete", function(req, res) {
  Image.remove().exec(function(error,data){
     if(error){
        res.send(error)
      }
      else{
        res.send(data)
      }
   });
})




// app.post("/resize",function(req, res, next){
//     console.log(req.body.width)
//     if(req.body.width<=768){
//       console.log("lllll")
//       res.redirect("/mobile")
      
//     }
//     else{
//       console.log("kkkkk")

//       res.redirect("/index1")
//       console.log("ggg")
//           }
// })




///////////////////OUTFITS PAGE
// app.get("/outfits", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/outfits.html"));

// })


app.get("/desktop", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/desktop.html"));

});

app.get("/mobile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mobile.html"));
});

}////MODULE END///////

 

