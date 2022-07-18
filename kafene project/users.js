if (localStorage.getItem("loginStatus") == "True") {
  const tbodyusers = document.getElementById("tbody_users");
  let userdata = JSON.parse(localStorage.getItem("UsersData"));
  const searchName = document.getElementById("searchName");
  const reset = document.getElementById("reset");

  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
    .then((res) => res.json())
    .then((data) => localStorage.setItem("UsersData", JSON.stringify(data)));

  function loadusersData(item) {
    const code = `
  <tr >
  <td id="Oid" >${item.id}</td>
        <td id="avatar"> <img src='${item.profilePic}' alt="avatar" /></td>
        <td id="fullName" >${item.fullName} </td>
        <td id="dob" >${item.dob}</td>
        <td id="gender" >${item.gender}</td>
        <td id="currentLoc" > ${item.currentCity} ${item.currentCountry} </td>
        </tr>`;
    tbodyusers.innerHTML += code;
  }

  userdata.map((items) => loadusersData(items));

  searchName.addEventListener("keyup", (e) => {
    if (searchName.value.length >= 2) {
      tbodyusers.innerHTML = "";
      userdata.filter((items) => {
        let name = items.fullName;
        if (
          String(name)
            .toLocaleLowerCase()
            .includes(searchName.value.toLowerCase())
        ) {
          loadusersData(items);
        }
        // console.log(searchName.value.toLowerCase())
      });
    } else {
      userdata.map((items) => loadusersData(items));
    }
  });

  reset.addEventListener("click", () => {
    searchName.value = "";
    userdata.map((items) => loadusersData(items));
  });



  const Navbar_Navigation = document.getElementById('Navbar_Navigation')
 Navbar_Navigation.addEventListener('click',(e)=>{
  if(e.target.id == "navig1"){
    const navig = document.querySelector('#navig1')
    navig.classList.add('active') 
    location.assign('orders.html')
  }else if(e.target.id == "navig2"){
    const navig = document.querySelector('#navig2')
    navig.classList.add('active') 
    location.assign('Products.html')
  }else if(e.target.id == "navig3"){
    const navig = document.querySelector('#navig3')
    navig.classList.add('active') 
    location.assign('users.html')
  }
 })






  const logoutDiv = document.getElementById("logoutDiv");
  logoutDiv.addEventListener("click", () => {
    let newStatus = "False";
    localStorage.setItem("loginStatus", newStatus);
    alert("Redirecting to login page");
    location.assign(location.origin);
  });
} else {
  alert("Please Login First");
}
