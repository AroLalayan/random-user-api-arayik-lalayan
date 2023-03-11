fetch("https://randomuser.me/api/")
  .then((response) => response.json())
  .then((result) => {  
    userRandomGenerate(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

document.getElementById("user-generate").addEventListener("click", function(){
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((result) => {  
      userRandomGenerate(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function userRandomGenerate(result) {
  var userData = result['results'][0];

  var userAvatar        = userData.picture.large;
  var userNameData      = userData.name;
  var userBirthData     = userData.dob;
  var userLocationData  = userData.location;

  var userName = userNameData.title + " " + userNameData.first + " " + userNameData.last;

  var userBirthDate = new Date(userBirthData.date);
  var userBirth = userBirthDate.customFormatDate( "#MMMM# #DD#, #YYYY#" );

  var userAge           = userBirthData.age;
  var userPhone         = userData.phone;
  var userEmail         = userData.email;

  var userNationality   = userLocationData.country;
  var userCity          = userLocationData.city;
  var userStreet        = userLocationData.street.name;
  var userStreetNumber  = userLocationData.street.number;

  document.getElementById("user-avatar").src = userAvatar;
  document.getElementById("user-name").innerText = userName;
  document.getElementById("user-birth").innerText = userBirth + " ("+ userAge +" years old)";
  document.getElementById("user-phone").innerText = userPhone;
  document.getElementById("user-email").innerText = userEmail;
  document.getElementById("user-nationality").innerText = userNationality;
  document.getElementById("user-location").innerText = userStreetNumber + " " + userStreet + ", " + userCity;

  document.getElementsByTagName('body')[0].style.backgroundColor = getRandomColor();
}

// generate a random color for design
function getRandomColor() {
    var brightness = 4;

    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return rgbToHex(mixedrgb[0], mixedrgb[1], mixedrgb[2]);
}

function rgbToHex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

Date.prototype.customFormatDate = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;

  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};
