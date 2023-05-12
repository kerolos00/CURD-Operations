let nameInput = document.getElementById("ProductName");
let priceInput = document.getElementById("ProductPrice");
let categoryInput = document.getElementById("ProductCategory");
let descriptionInput = document.getElementById("ProductDescription");
let searchInput = document.getElementById("searchInput");
let productList = [];
let currentIndex = null;
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct();
}

function setProduct() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

function getProduct() {
  JSON.parse("productList", localStorage.getItem(productList));
}

function addProduct() {
  let Product = {
    name: nameInput.value,
    price: priceInput.value,
    category: categoryInput.value,
    description: descriptionInput.value,
  };
  productList.push(Product);
  setProduct();
  displayProduct();
  clearForm();
}

function displayProduct() {
  let temp = "";
  for (let i = 0; i < productList.length; i++) {
    temp += `<tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].description}</td>
      <td>
          <button onclick="updateProduct(${i})" class="btn btn-info">Update</button>
      </td>
      <td>
          <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function clearForm() {
  nameInput.value = null;
  priceInput.value = null;
  categoryInput.value = "mobile";
  descriptionInput.value = null;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct();
  setProduct();
}

function search() {
  let searchValue = searchInput.value.toLowerCase();
  let temp = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue) == true) {
      temp += `<tr>
      <td>${i + 1}</td>
      <td>${productList[i].name
        .toLowerCase()
        .replace(
          searchValue,
          `<span class='text-info fw-bold'>${searchValue}</span>`
        )}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category
        .toLowerCase()
        .replace(
          searchValue,
          `<span class='text-info fw-bold'>${searchValue}</span>`
        )}</td>
      <td>${productList[i].description}</td>
      <td>
          <button onclick="updateProduct()" class="btn btn-info">Update</button>
      </td>
      <td>
          <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function updateProduct(index) {
  currentIndex = index;
  nameInput.value = productList[index].name;
  priceInput.value = productList[index].price;
  categoryInput.value = productList[index].category;
  descriptionInput.value = productList[index].description;

  document.getElementById("addProduct").style.display = "none";
  document.getElementById("addEdit").style.display = "inline-block";
}

function addEdit() {
  productList[currentIndex].name = nameInput.value;
  productList[currentIndex].price = priceInput.value;
  productList[currentIndex].category = categoryInput.value;
  productList[currentIndex].description = descriptionInput.value;
  displayProduct();
  clearForm();
  setProduct();
  document.getElementById("addEdit").style.display = "none";
  document.getElementById("addProduct").style.display = "inline-block";
}
