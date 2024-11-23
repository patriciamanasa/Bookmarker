var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var errorelement = document.getElementById("error")
var websiteList = [];

if (localStorage.getItem("list")) {
  websiteList = JSON.parse(localStorage.getItem("list"));
  displayData();
}
  function webSite() {
    document.getElementById("sitename-error").style.display = "none";
    document.getElementById("siteurl-error").style.display = "none";
    var isValid = true;
    /* sitename */
    if (sitename.value.length < 3) {
      document.getElementById("sitename-error").innerText = "Site name must contain at least 3 characters.";
      document.getElementById("sitename-error").style.display = "block";
      isValid = false;
    }
    /* siteurl */
    var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(siteurl.value)) {
      document.getElementById("siteurl-error").innerText = "Site URL must be a valid one.";
      document.getElementById("siteurl-error").style.display = "block";
      isValid = false;
    }
    if (isValid) {
      var website = {
        name: sitename.value,
        url: siteurl.value
      };

  websiteList.push(website);
  localStorage.setItem("list", JSON.stringify(websiteList));
  displayData();

/*  Clear input after submission */
  sitename.value = '';
  siteurl.value = '';
}
  }

function displayData() {
  var temp = "";
  for (var i = 0; i < websiteList.length; i++) {
    temp += `
      <tr>
        <td scope="row">${i + 1}</td>
        <td>${websiteList[i].name}</td>
        <td><button class="btn btn-visit" onclick="visitWebsite('${websiteList[i].url}')"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button class="btn btn-delete" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
      </tr>`;
  }
  document.getElementById("data").innerHTML = temp;
}

/* to visit a website */
function visitWebsite(url) {
  window.open(url, '_blank');
}
/* to delete a website */
function deleteWebsite(index) {
  websiteList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(websiteList));
  displayData();
}
