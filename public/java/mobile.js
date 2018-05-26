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
        })
     }
  })    

}




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
   var userCity=weather['location']['city'];
   var userState =weather['location']['state'];
    $.ajax({
            method: "GET",
            url: '/location',  //fileId
          }).done(function(data) {
              data1=data.reverse();
            
            for(i=0;i<data.length;i++){

              if(data[i].mimetype==="video/quicktime"){
                  //var video ='<iframe src="https://drive.google.com/file/d/'+data[i].id+'/preview" height="400"></iframe>';
                  var video ='<iframe src='+ data[i].link+'></iframe><br><br>';
                  $("#a").prepend(video + "<h4>" + data[i].date+ "</h4><h5>"+ data[i].location+"</h5><br><br><br>");
                }

              else{
                 var link= "<img clas='img-responsive' src="+ data[i].link+"><br><br>"
                  //$("#a").append("<img clas='img-responsive' src='"+link+"'> <br><br><br>")
                  //$("#a").append(link+ "<h4>" + date +" " +time+ "</h4><h5>" + userCity +" " +userState+ "</h5><br><br><br>");
                $("#a").prepend(link+ "<h4>" + data[i].date+"</h4><h5>" + data[i].location+"</h5><br><br><br>");
              }
            }
  })
}        




$( "#avatar" ).change(function() {
   $( "#file" ).trigger( "click" );
   // $("#a").empty();
   $("#a").empty();
   //$("#c").empty();
   $("#a").append("<img class='img-responsive' src='css/load1.gif'>")
});




$( "form" ).submit(function() {$("#a").empty();});
var count=0;
$( window ).resize(function() {
  count++;
  var width=$( document  ).width();

// if(count!=1){
//   return false;
// }
  if(width>981){
   console.log(count)
   console.log(width)
      window.location.href ="/desktop"
    }
    else{
            window.location.href ="/mobile"
    }
});


