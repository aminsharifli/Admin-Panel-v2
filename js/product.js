let listcontainer = document.getElementById('productList')
let productCount = document.getElementById('productCount')
let totalValue = document.getElementById('totalValue')

let drawerTitle = document.getElementById('drawerTitle')
let drawerImage = document.getElementById('drawerImage')
let drawerCategory = document.getElementById('drawerCategory')
let drawerPrice = document.getElementById('drawerPrice')
let drawerStock = document.getElementById('drawerStock')
let drawerId = document.getElementById('drawerId')

let data = []

function getProducts() {
    fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar')
        .then(res => res.json())
        .then(resData => {
            data = resData
            renderProduct(data)
            renderStats()
        })
}

function renderProduct(arr) {
    listcontainer.innerHTML = arr.map(item =>
        `<div class="table-row" onclick="showDetail('${item.id}')">
            <div><img src="${item.photo}" alt=""></div>
            <div>${item.name}</div>
            <div>${item.category}</div>
            <div>${item.num} ədəd</div>
            <div class="price">${item.price} AZN</div>
            <div>
                <button class="delete-btn" onclick="deletmehsul(event,'${item.id}')">Sil</button>
            </div>
        </div>`
    ).join('')
}

function filtrProduct(name, btn) {
    let butonlar = catlist.querySelectorAll('.category-btn')
    for (let i = 0; i < butonlar.length; i++) {
        butonlar[i].classList.remove('active')
    }

    btn.classList.add('active')

    let filterdata = name === 'Hamısı' ? data : data.filter(item => item.category === name)
    renderProduct(filterdata)
}

function renderStats() {
    productCount.innerHTML = data.length
    let total = 0
    for (let i = 0; i < data.length; i++) {
        total += Number(data[i].price) * Number(data[i].num)
    }
    totalValue.innerHTML = total + ' AZN'
}

function showDetail(id) {
    let mehsul = data.find(item => item.id == id)
    if (!mehsul) return
    drawer.classList.add('show')
    overlay.classList.add('show')

    drawerTitle.innerHTML = mehsul.name
    drawerImage.src = mehsul.photo
    drawerCategory.innerHTML = mehsul.category
    drawerPrice.innerHTML = mehsul.price + ' AZN'
    drawerStock.innerHTML = mehsul.num + ' ədəd'
    drawerId.innerHTML = mehsul.id
}

function deletmehsul(event, id) {
    event.stopPropagation()
    fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        getProducts()
        drawer.classList.remove('show')
        overlay.classList.remove('show')
        showMessage('Məhsul silindi')
    })
}

function addProduct() {
    let title = document.getElementById('title')
    let category = document.getElementById('category')
    let image = document.getElementById('image')
    let price = document.getElementById('price')
    let count = document.getElementById('stock')

    if (
        title.value === '' ||
        category.value === '' ||
        image.value === '' ||
        price.value === '' ||
        count.value === ''
    ) {
        alert('Bütün xanaları doldur')
        return
    }

    let yeniMehsul = {
        name: title.value,
        category: category.value,
        photo: image.value,
        price: price.value,
        num: count.value
    }

    fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar', {
        method: 'POST',
        body: JSON.stringify(yeniMehsul),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(res => res.json())
    .then(() => {
        getProducts()

        title.value = ''
        category.value = ''
        image.value = ''
        price.value = ''
        count.value = ''

        modal.classList.remove('show')
        overlay.classList.remove('show')

        showMessage('Məhsul əlavə edildi')
    })
}