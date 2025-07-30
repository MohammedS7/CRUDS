let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchByTitle = document.getElementById('searchByTitle');
let searchByCategory = document.getElementById('searchByCategory');

let mood = 'create';
let temp;

// Get Total
function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#8b1818';
    }
}

// Create Product
let dataPro = [];

if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}

submit.onclick = function() {
    let properties = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    // Clean Data
    if(properties.title != '' && properties.price != '' && properties.category != '' && properties.count <= 100) {
        if(mood === 'create') {
            // Count
            if(properties.count > 1) {
            for(i = 0; i < properties.count; i++) {
                dataPro.push(properties);
            }
            }else {
                dataPro.push(properties);
            }
        }else {
            dataPro[temp] = properties;
            count.style.display = 'block';
            submit.innerHTML = 'Create';
            mood = 'create';
        }
        clearInputes();
    // Save LocalStorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    showData()
    clearInputes()
    }
}

// Clear Inputes
function clearInputes() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = '#8b1818';
    count.value = '';
    category.value = '';
}

// Read
function showData() {
    let table = '';

    for(i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll');
    if(dataPro.length != 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData();

// Delete
function deleteProduct(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0, behavior: "smooth"
    })
}

// Search
let searchMood = 'title';

function getSearchMood(id) {
    search.focus();
    if(id == 'searchByTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
}

function searchData(value) {
    let table = '';
    for(i = 0; i < dataPro.length; i++) {
        if(searchMood == 'title') {
            if(dataPro[i].title.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
                    </tr>
                `;
            }
        }else {
            if(dataPro[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
                    </tr>
                `;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
}
mood = 'create';
