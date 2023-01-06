var openModal = document.querySelector("#modalBtn");
var modalBox = document.getElementsByClassName("modal")[0];
var closeModal = document.querySelector(".close");
var submitBtn = document.querySelector("#submitGoal");

openModal.addEventListener("click", function () {
  modalBox.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modalBox.style.display = "none";
});

//save user's name and goal in local storage
function saveToLocal() {
  var userName = document.querySelector("#userName").value.trim();
  var userGoal = document.querySelector("#myGoal").value.trim();

  var userGoal = {
    name: userName,
    goal: userGoal
  }

  localStorage.setItem("savedGoal", JSON.stringify(userGoal));

  printGoal()
}

//Retrieve data from local storage, if no data, print no name and ... as goal on the page instead
function printGoal() {
  var savedUserGoal = JSON.parse(localStorage.getItem("savedGoal")) || {
    name: "",
    goal: "..."
  }

  console.log(savedUserGoal)

  var savedUser = document.querySelector("#savedUser");
  savedUser.textContent = savedUserGoal.name
  var savedGoal = document.querySelector("#savedGoal")
  savedGoal.textContent = savedUserGoal.goal


}

submitBtn.addEventListener("click", function () {
  console.log("Saving!");
  saveToLocal();
  modalBox.style.display = "none";
  getImg()
});


printGoal()

var accessKey = process.env.ACCESS_KEY
var getUrl = "https://api.unsplash.com/photos/random/?client_id=" + accessKey
var randomImg = document.querySelector("#randomImg")
var imgSource = document.querySelector("#imgLink")
var imgCreator = document.querySelector("#creator")
var lastImg = localStorage.getItem("lastImg")
function getImg (){
fetch(getUrl)
  .then(function (response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
    randomImg.src = data.urls.regular
    imgSource.setAttribute("href", data.links.html)
    imgCreator.textContent = data.user.name
    imgCreator.setAttribute("href", data.user.portfolio_url)
    localStorage.setItem("lastImg", data.urls.regular)
  })
}
randomImg.src = lastImg
