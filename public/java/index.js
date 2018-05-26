var userCity;
var userState;
var Geo={};
//////////////////////////////////////////WEATHER API///////////////////////////////////////////
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success);
}
else {
alert('Geolocation is not supported');
}

function success(position) {
      Geo.lat = position.coords.latitude;
      Geo.lng = position.coords.longitude;
      console.log(Geo.lat)
       console.log(Geo.lng)
    var key ="e37b6970552858ff";
    var Weather = "http://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/"
               + Geo.lat + "," + Geo.lng + ".json";
      $.ajax({
      url : Weather,
      dataType : "jsonp",
      success : function(weather) {
        var userCity=weather['location']['city'];
        var userState =weather['location']['state'];

          start(weather)
          $.ajax({
          method: "POST",
          url: '/geo',
          data:{
            city:userCity,
            state:userState
          }
        }).done(function(data) {
          //console.log(data)
          start(weather)
        })
     }
  })    

}



var a =0; var b=1; var c=2;
$( "#file" ).hide();
var tiempo= new Date();
var date=new Date();
var time= tiempo.toLocaleString('en-us',{hour:'numeric',minute:'numeric',hour12:true})
var date= date.toLocaleString('en-us',{weekday:'long',month:'long',day:'numeric'})
var day= date.toLocaleString('en-us',{weekday:'long'})
console.log(date +" " +time)
console.log(time[5])
var data1;




function start(weather){
   //var userCity=weather['location']['city'];
   //var userState =weather['location']['state'];
    $.ajax({
            method: "GET",
            url: '/location',  //fileId
          }).done(function(data) {
            console.log(data)
              data1=data.reverse();
              Slider(data1);

          })
}

            // for(i=0;i<data.length;i++){

            //   if(data[i].mimetype==="video/quicktime"){
            //       //var video ='<iframe src="https://drive.google.com/file/d/'+data[i].id+'/preview" height="400"></iframe>';
            //       var video ='<iframe src='+ data[i].link+' height="400"></iframe>';
            //       $("#a").prepend(video + "<h4>" + data[i].date+ "</h4><h5>"+ data[i].location+"</h5><br><br><br>");
            //     }

            //   else{
            //      var link= "<img clas='img-responsive' src="+ data[i].link+">"
            //       //$("#a").append("<img clas='img-responsive' src='"+link+"'> <br><br><br>")
            //       //$("#a").append(link+ "<h4>" + date +" " +time+ "</h4><h5>" + userCity +" " +userState+ "</h5><br><br><br>");
            //     $("#a").prepend(link+ "<h4>" + data[i].date+"</h4><h5>" + data[i].location+"</h5><br><br><br>");
            //   }
            // }
 
  //  if(data[a].mimetype==="video/quicktime" || data[b].mimetype==="video/quicktime" ||data[c].mimetype==="video/quicktime"){
  //    var video ='<iframe src='+ data[a].link+' height="400"></iframe>';
  //    var video1 ='<iframe src='+ data[b].link+' height="400"></iframe>';
  //    var video2 ='<iframe src='+ data[c].link+' height="400"></iframe>';
  //   $("#a").html(video + "<h4>" + data[a].date+ "</h4><h5>"+ data[a].location+"</h5><br><br><br>");
  //   $("#b").html(video + "<h4>" + data[b].date+ "</h4><h5>"+ data[b].location+"</h5><br><br><br>");
  //   $("#c").html(video + "<h4>" + data[c].date+ "</h4><h5>"+ data[c].location+"</h5><br><br><br>");
  //           }
  //            else{
  //                var link= "<img clas='img-responsive' src="+ data[a].link+">";
  //                var link1= "<img clas='img-responsive' src="+ data[b].link+">"
  //                var link2= "<img clas='img-responsive' src="+ data[c].link+">"
  //               $("#a").html(link+ "<h4>" + data[a].date+"</h4><h5>" + data[a].location+"</h5><br><br><br>");
  //               $("#b").html(link1+ "<h4>" + data[b].date+"</h4><h5>" + data[b].location+"</h5><br><br><br>");
  //               $("#c").html(link2+ "<h4>" + data[c].date+"</h4><h5>" + data[c].location+"</h5><br><br><br>");
  //             }


          




$( "#avatar" ).change(function() {
   $( "#file" ).trigger( "click" );
   $("#a").empty();
   $("#b").empty();
   $("#c").empty();
   $("#b").append("<img class='img-responsive' src='css/load1.gif'>")
});




$( "form" ).submit(function() {$("#a").empty();});


 $(document).on("click","#a",function(){
  a++;b++;c++;
  if(a===data.length){a=0;} 
  if(b===data.length){b=0;} 
  if(c===data.length){c=0;} 
  Slider(data1)
 })

 $(document).on("click","#c",function(){
  a--;b--;c--;
  if(a<0){a=data.length-1;}
  if(b<0){b=data.length-1;}
  if(c<0){c=data.length-1;}
  Slider(data1)
 })



var leftSlider="<div class='middle'><img src='css/left.png' class='img-responsive text'></div>";
var rightSlider="<div class='middle'><img src='css/right.png' class='img-responsive text'></div>";



function Slider(data1){
  data=data1;
     // if(data[a].mimetype==="video/quicktime" || data[b].mimetype==="video/quicktime" ||data[c].mimetype==="video/quicktime"){
     //     console.log("HERE")
     //     var video ='<iframe src='+ data[a].link+' height="400"></iframe>';
     //     var video1 ='<iframe src='+ data[b].link+' height="400"></iframe>';
     //     var video2 ='<iframe src='+ data[c].link+' height="400"></iframe>';
     //    $("#a").html(video + "<h4>" + data[a].date+ "</h4><h5>"+ data[a].location+"</h5><br><br><br>");
     //    $("#b").html(video1 + "<h4>" + data[b].date+ "</h4><h5>"+ data[b].location+"</h5><br><br><br>");
     //    $("#c").html(video2 + "<h4>" + data[c].date+ "</h4><h5>"+ data[c].location+"</h5><br><br><br>");
     //        }

console.log(data)
 if(data[a].mimetype==="video/quicktime"){
      // $("iframe").css("height","200px !important")
        var video ='<iframe class="sm" src='+ data[a].link+' height="200"></iframe>'+leftSlider;
        //$("#a").hide().html(video + "<h4>" + data[a].date+ "</h4><h5>"+ data[a].location+"</h5><br><br><br>").fadeIn('slow');
        $("#a").hide().html(video).fadeIn('slow');

     }


     if(data[b].mimetype==="video/quicktime"){
        var video1 ='<iframe class="lg" src='+ data[b].link+' height="400px !important"></iframe>';
         $("#b").html(video1 + "<br><h4>" + data[b].date+ "</h4><h5>"+ data[b].location+"</h5><br><br><br>");
         //$("#b").html(video1);
     }

     if(data[c].mimetype==="video/quicktime"){
        var video2 ='<iframe class="sm" src='+ data[c].link+' height="200"></iframe>'+rightSlider;
       //$("#c").hide().html(video2 + "<h4>" + data[c].date+ "</h4><h5>"+ data[c].location+"</h5><br><br><br>").fadeIn('slow');
       $("#c").hide().html(video2).fadeIn('slow');
     }




      if(data[a].mimetype!=="video/quicktime"){
        var link= "<img class='img-responsive cla' src="+ data[a].link+">"+leftSlider;
         // $("#a").hide().html(link+ "<h4>" + data[a].date+"</h4><h5>" + data[a].location+"</h5><br><br><br>").fadeIn('slow');
         $("#a").hide().html(link).fadeIn('slow');

         $(".cla").css("height","200px !important")

     }

     if(data[b].mimetype!=="video/quicktime"){
        var link1= "<img class='img-responsive clb' src="+ data[b].link+">";
        $("#b").html(link1+ "<br><h4>" + data[b].date+"</h4><h5>" + data[b].location+"</h5><br><br><br>").fadeIn();
        $(".clb").css("height","400px !important")
     }

     if(data[c].mimetype!=="video/quicktime"){

        var link2= "<img class='img-responsive clb' src="+ data[c].link+">"+rightSlider;
        $("#c").hide().html(link2

          ).fadeIn('slow');
        //$("#c").hide().html(link2+ "<h4>" + data[c].date+"</h4><h5>" + data[c].location+"</h5><br><br><br>").fadeIn('slow');
        $(".clb").css("height","200px !important")
           
     }




             // else{
             //     var link= "<img class='img-responsive' src="+ data[a].link+">";
             //     var link1= "<img class='img-responsive' src="+ data[b].link+">"
             //     var link2= "<img class='img-responsive' src="+ data[c].link+">"
             //    // $("#a").html(link+ "<h4>" + data[a].date+"</h4><h5>" + data[a].location+"</h5><br><br><br>");
             //     $("#a").html(link+ "<h4>" + data[a].date+"</h4><h5>" + data[a].location+"</h5><br><br><br>");
             //    $("#b").html(link1+ "<h4>" + data[b].date+"</h4><h5>" + data[b].location+"</h5><br><br><br>");
             //    $("#c").html(link2+ "<h4>" + data[c].date+"</h4><h5>" + data[c].location+"</h5><br><br><br>");
             //  }


          
  }
//}

//var count=0;
$( window ).resize(function() {
  var width=$( document  ).width();


  if(width>=768){
      window.location.href ="/mobile";
    }
    // else{
    //   window.location.href ="/desktop"
    // }
});