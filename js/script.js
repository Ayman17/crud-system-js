var productName = document.getElementById("productName");
var productCompany = document.getElementById("productCompany");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productPrice = document.getElementById("productPrice");
var productContainer = [];
var storageContent = JSON.parse(localStorage.getItem("products"));
if (storageContent != null) {
    productContainer = storageContent;
}
searchAndDisplayProduct();

// TODO: FIX THIS when i delete with search filter the deleted element is not the element that i want to delete
// TODO: FIX THIS when i update the product it's index changed

// Add new product or update choosen product to product container and local storage and display searched products
function AddProduct() {
    // change update button to add product and change it's appearance 
    document.getElementById("addBtn").classList = "btn btn-warning";
    document.getElementById("addBtn").innerHTML = "Add Product";

    var product = {
        name: productName.value,
        company: productCompany.value,
        category: productCategory.value,
        description: productDescription.value,
        price: productPrice.value
    };
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearInputsData();
    searchAndDisplayProduct();
}

// Clear inputs from added product data
function clearInputsData() {
    document.getElementById("productName").value = "";
    document.getElementById("productCompany").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
}

// Display searched products
function dispalyProducts(contentToDisplay) {
    // clear products table 
    document.getElementById("tbody").innerHTML = "";

    var productDisplayContainer = ``;
    for (var i = 0; i < contentToDisplay.length; i++) {
        productDisplayContainer += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${contentToDisplay[i].name}</td>
            <td>${contentToDisplay[i].company}</td>
            <td>${contentToDisplay[i].category}</td>
            <td>${contentToDisplay[i].description}</td>
            <td>${contentToDisplay[i].price}</td>
            <td>
                <button type="button" class="btn btn-success" onclick="addDataInInput(${i})">Update</button>
                <button type="button" class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>
    `
    }
    document.getElementById("tbody").innerHTML = productDisplayContainer;
}

// Take choosen product data to input data and delet older product
function addDataInInput(index) {
    // Take data up from products table to input data
    if (index >= 0 && index < productContainer.length) {
        document.getElementById("productName").value = productContainer[index].name;
        document.getElementById("productCompany").value = productContainer[index].company;
        document.getElementById("productCategory").value = productContainer[index].category;
        document.getElementById("productDescription").value = productContainer[index].description;
        document.getElementById("productPrice").value = productContainer[index].price;

        // change add button to update product and change it's appearance
        document.getElementById("addBtn").classList = "btn btn-success";
        document.getElementById("addBtn").innerHTML = "Update Product";

        // Remove old product from product container
        deleteProduct(index);
    } else {
        alert("Invalid index!");
    }
}

// Delete product from product container and local storage
function deleteProduct(index) {
    if (index >= 0 && index <= productContainer.length) {
        productContainer.splice(index, 1);
        
        // Update local storage after delete
        localStorage.setItem("products", JSON.stringify(productContainer));

        // display searched products after delete
        searchAndDisplayProduct();
    } else {
        alert("Invalid index!");
    }
}

// Search and display products
function searchAndDisplayProduct() {
    var searchKey = document.getElementById("search").value;
    var searchResult = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            searchResult.push(productContainer[i]);
        }
    }
    dispalyProducts(searchResult);
}

// Clear All products and local storage
function clearAll() {
    productContainer = [];
    localStorage.removeItem('products');
    searchAndDisplayProduct();
}