// Product info
var productName = document.getElementById("productName");
var productCompany = document.getElementById("productCompany");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productPrice = document.getElementById("productPrice");

// products container
var productContainer = [];
var storageContent = JSON.parse(localStorage.getItem("products"));
if (storageContent != null) {
    productContainer = storageContent;
}

// Regex Vlidators
var nameRegex = /^[a-z A-Z]{3,}$/;
var companyRegex = /^[a-z A-Z]{3,}$/;
var categoryRegex = /^[a-z A-Z]{3,}$/;
var descriptionRegex = /^[a-z A-Z0-9]{4,}$/;
var priceRegex = /^[1-9][0-9]{1,}$/;

// Dispaly searched products
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
        price: productPrice.value,
    };
    
    if (validateAllProductInfo()) {
        productContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productContainer));
        clearInputsData();
        searchAndDisplayProduct();
        clearValidationStyle();
    }
    else {
        alert("Invalid product data all fields required");
    }

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
        productName.value = productContainer[index].name;
        productName.classList.add("is-valid");
        productCompany.value = productContainer[index].company;
        productCompany.classList.add("is-valid");
        productCategory.value = productContainer[index].category;
        productCategory.classList.add("is-valid");
        productDescription.value = productContainer[index].description;
        productDescription.classList.add("is-valid");
        productPrice.value = productContainer[index].price;
        productPrice.classList.add("is-valid");

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

// validate value with regex
function validateValueWithRegex(validator, value) {
    if (validator.test(value)) {
        return true;
    }
    return false;
}

// Validate each product info with it's regex using id
function validateEachProductInfo(input, id) {
    var validator = ``;
    var productInfo;

    // choose the right regex and product info variable
    switch (id) {
        case "productName":
            validator = nameRegex;
            productInfo = productName;
            break;
        case "productCompany":
            validator = companyRegex;
            productInfo = productCompany;
            break;
        case "productCategory":
            validator = categoryRegex;
            productInfo = productCategory;
            break;
        case "productDescription":
            validator = descriptionRegex;
            productInfo = productDescription;
            break;
        case "productPrice":
            validator = priceRegex;
            productInfo = productPrice;
            break;
        default:
            alert("Invalid input id!");
            break;
    }

    // if valid add valid class and remove invalid class else add invalid class and remove valid class
    if (validateValueWithRegex(validator, input)) {
        productInfo.classList.add("is-valid");
        productInfo.classList.remove("is-invalid");
    } else {
        productInfo.classList.add("is-invalid");
        productInfo.classList.remove("is-valid");
    }
}

// validate all product info
function validateAllProductInfo() {
    if (productName.classList.contains('is-valid') && productCompany.classList.contains('is-valid') && productCategory.classList.contains('is-valid') && productDescription.classList.contains('is-valid') && productPrice.classList.contains('is-valid')) {
        return true;
    }
    return false;
}

// Clear validation style from inputs
function clearValidationStyle() {
    productName.classList.remove("is-valid");
    productCompany.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
}