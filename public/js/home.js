var groupBackBtn = document.getElementById("backGroups");
var backFriendsBtn = document.getElementById("backFriends");
var backTimeLineBtn = document.getElementById("backTimeline")
var themeBtn = document.querySelector(".themeSelector")
var homeSecs = document.querySelectorAll('.homeSections')
let buttonStatus = true;


document.querySelectorAll(".friendName").forEach((item) => {
    item.addEventListener("click", () => {
      backFriendsBtn.style.display = "inline";
    });
  });

  backFriendsBtn.addEventListener("click", function () {
    backFriendsBtn.style.display = "none";
  });
  

document.querySelectorAll(".groupLink").forEach((item) => {
  item.addEventListener("click", () => {
    groupBackBtn.style.display = "inline";
  });
});

groupBackBtn.addEventListener("click", function () {
  groupBackBtn.style.display = "none";
});












// themeBtn.addEventListener('click', function() {
//     if(buttonStatus === true){
//     var i = 0, max = homeSecs.length; i < max; i++;
//         homeSecs[i].style.background = "black";
//          buttonStatus = false;
        
//     }
//           if (buttonStatus=false) {
//             homeSecs[i].style.background = "rgba(115, 0, 255, 0.575)"
    
//          }})



// function white (buttonStatus) {
// themeBtn.addEventListener('click', function() {

//     if(buttonStatus === false){
//     for (var i = 0, max = homeSecs.length; i < max; i++) {
//         homeSecs[i].style.background = "rgba(115, 0, 255, 0.575)";
//         buttonStatus = true;
//         console.log(buttonStatus);
// }}
// })
// }
// console.log(buttonStatus);

