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
  const userData = result['results'][0];

  let userAvatar        = userData.picture.large;
  let userNameData      = userData.name;
  let userBirthData     = userData.dob;
  let userLocationData  = userData.location;

  let userName = userNameData.title + " " + userNameData.first + " " + userNameData.last;

  let userBirthDate = new Date(userBirthData.date);
  let userBirth = userBirthDate.customFormatDate( "#MMMM# #DD#, #YYYY#" );

  let userAge           = userBirthData.age;
  let userPhone         = userData.phone;
  let userEmail         = userData.email;

  let userNationality     = userLocationData.country;
  let userNationalityCode = userData.nat;
  let userCity            = userLocationData.city;
  let userStreet          = userLocationData.street.name;
  let userStreetNumber    = userLocationData.street.number;

  document.getElementById("user-avatar").src            = userAvatar;
  document.getElementById("user-name").innerText        = userName;
  document.getElementById("user-birth").innerText       = userBirth + " ("+ userAge +" years old)";
  document.getElementById("user-phone").innerText       = userPhone;
  document.getElementById("user-email").innerText       = userEmail;
  document.getElementById("user-nationality").innerText = userNationality + " (" + userNationalityCode + ") ";
  document.getElementById("user-location").innerText    = userStreetNumber + " " + userStreet + ", " + userCity;

  document.getElementsByTagName('body')[0].style.backgroundColor = getRandomColor();
}

// generate a random color for design
function getRandomColor() {
  const brightness = 4;

  let rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  let mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
  let mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})

  return rgbToHex(mixedrgb[0], mixedrgb[1], mixedrgb[2]);
}

function rgbToHex(red, green, blue) {
  let rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

Date.prototype.customFormatDate = function(formatString){
  let YYYY,MMMM,DD,D,M;

  M    = this.getMonth()+1;
  D    = this.getDate();
  YYYY = this.getFullYear();

  MMMM = ["January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ][M-1].substring(0,3);

  if( D < 10 ){
    DD = '0'+D;
  } else {
    DD = D;
  }

  let res = formatString.replace("#YYYY#",YYYY).replace("#MMMM#",MMMM).replace("#DD#",DD);

  return res;
};
