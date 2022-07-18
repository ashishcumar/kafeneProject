if (localStorage.getItem("loginStatus") == "True") {
  const Product_Count = document.getElementById("Product_Count");
  const tbody_Products = document.getElementById("tbody_Products");
  const productData = JSON.parse(localStorage.getItem("ProductData"));
  const filterContainer = document.getElementById("filterContainer");
  const Expired = document.getElementById("Expired");
  const LowStock = document.getElementById("LowStock");
  let ProdRes = JSON.parse(localStorage.getItem("ProductData"));
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
    .then((res) => res.json())
    .then((data) => localStorage.setItem("ProductData", JSON.stringify(data)));

  productData.map((item, index) => loadProductData(item, index));

  function loadProductData(item, index) {
    const code = `
      <tr >
      <td id="Pid" >${item.id}</td>
      <td id="PmedicineName">  ${item.medicineName}</td>
      <td id="Pbrands" >${item.medicineBrand} </td>
      <td id="Pexpiry" >${item.expiryDate}</td>
      <td id="PunitPrice" >${item.unitPrice}</td>
      <td id="PStock" > ${item.stock} </td>
      </tr>`;
    tbody_Products.innerHTML += code;
    Product_Count.innerHTML = index + 1;
  }

  console.log(ProdRes.length);

  filterContainer.addEventListener("change", (e) => {
    if (e.target.id === "Expired") {
      tbody_Products.innerHTML = "";
      if (Expired.checked) {
        ProdRes.map((items, index) => {
          loadProductData(items, index);
        });
      } else {
        let localProdRes = JSON.parse(localStorage.getItem("ProductData"));
        let value = -1;
        localProdRes.filter((items) => {
          if (items.expiryDate.split("-")[2] > 2022) {
            value++;
            loadProductData(items, value);
          }
        });
      }
    } else if (e.target.id == "LowStock") {
      tbody_Products.innerHTML = "";
      if (LowStock.checked) {
        ProdRes.map((items, index) => loadProductData(items, index));
      } else {
        let localProdRes = JSON.parse(localStorage.getItem("ProductData"));
        let value = -1;
        localProdRes.filter((items) => {
          if (items.stock > 100) {
            value++;
            loadProductData(items, value);
          }
        });
      }
    }
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
