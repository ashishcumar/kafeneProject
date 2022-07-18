if(localStorage.getItem('loginStatus')  == "True"){
  
const tbody = document.getElementById("tbody");
const filterContainer = document.getElementById("filterContainer");
const order_Count = document.getElementById("order_Count");


  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
    .then((res) => res.json())
    .then((data) => localStorage.setItem('orderData',JSON.stringify(data)));

let orderDataFirstload = JSON.parse(localStorage.getItem('orderData'))
console.log(orderDataFirstload)
orderDataFirstload.map((items,index) => loadOrderData(items,index) )
  
  function loadOrderData(item, index) {
    const code = `
      <tr >
      <td id="Oid">${item.id}</td>
      <td id="OcustomerName" >${item.customerName}</td>
      <td id="OorderData">${item.orderDate} <br/> <span id="order_TimeSpan"> ${item.orderTime} </span> </td>
      <td id="Oamount">$ ${item.amount}</td>
      <td id="OrderStatus">${item.orderStatus}</td>
      </tr>`;
    tbody.innerHTML += code;
    order_Count.innerHTML = index + 1;
  }
  
  let arr = ["New", "Delivered", "Packed", "InTransit"];
  localStorage.setItem("fetchStatus", JSON.stringify(arr));
  

//  const navig = document.querySelector('.navig1')
//  navig.classList.add('active')
 const Navbar_Navigation = document.getElementById('Navbar_Navigation')
 Navbar_Navigation.addEventListener('click',(e)=>{
  e.preventDefault()
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
 
  






  function addChecked(id) {
    let localResponse = JSON.parse(localStorage.getItem("fetchStatus"));
    let added = localResponse;
    added.push(id);
    localStorage.setItem("fetchStatus", JSON.stringify(added));
    reFetch();
  }
  
  function updateOnChange(iDname, status,) {
    console.log(iDname, status);
    let checkChecked = document.getElementById(status);
    if (checkChecked.checked) {
      let localResponse = JSON.parse(localStorage.getItem("fetchStatus"));
      localResponse.includes(status)
        ? console.log("reFetch()")
        : addChecked(status);
    } else {
      let localResponse = JSON.parse(localStorage.getItem("fetchStatus"));
      let replaced = localResponse.filter((item) => {
        if (item !== status) {
          return item;
        }
      });
  
      localStorage.setItem("fetchStatus", JSON.stringify(replaced));
      reFetch();
    }
  }
  
  filterContainer.addEventListener("change", (e) => {
      e.preventDefault()
    if (e.target.id == "New") {
      updateOnChange("newBox", "New");
    } else if (e.target.id == "Delivered") {
      updateOnChange("deliveredBox", "Delivered");
    } else if (e.target.id == "Packed") {
      updateOnChange("packedBox", "Packed");
    } else if (e.target.id == "InTransit") {
      updateOnChange("inTransitBox", "InTransit");
    }
  });
  
  function reFetch() {
    tbody.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("fetchStatus"));
    let orderData = JSON.parse(localStorage.getItem("orderData"));
    let value = 0
    orderData.filter((item) => {
      if (arr.includes(item.orderStatus)) {
        value ++
        loadOrderData(item, value);
      }
    });
  }

  const logoutDiv = document.getElementById('logoutDiv')
  logoutDiv.addEventListener('click',()=>{
    let newStatus = "False"
    localStorage.setItem('loginStatus',newStatus)
    alert('Redirecting to login page')
    location.assign(location.origin)
  })
}
else{
  alert('Please Login First')
}

