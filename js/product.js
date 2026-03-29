let listcontainer = document.getElementById('productList')
let productCount = document.getElementById('productCount')
let totalValue = document.getElementById('totalValue')

let drawerTitle = document.getElementById('drawerTitle')
let drawerImage = document.getElementById('drawerImage')
let drawerCategory = document.getElementById('drawerCategory')
let drawerPrice = document.getElementById('drawerPrice')
let drawerStock = document.getElementById('drawerStock')
let drawerId = document.getElementById('drawerId')

let srchinput = document.getElementById('srchinput')
let srccardlist = document.getElementById('srccardlist')

let data = []
let secilenCategory = 'Hamısı'

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
        `<div class="table-row" onclick="getDetail('${item.id}')">
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
    secilenCategory = name

    let butonlar = document.querySelectorAll('.category-btn')

    for (let i = 0; i < butonlar.length; i++) {
        butonlar[i].classList.remove('active')
    }

    if (btn) {
        btn.classList.add('active')
    }

    let axtarisSozu = srchinput.value.toLowerCase()

    let filterdata = data.filter(item => {
        let categoryUyur = name === 'Hamısı' ? true : item.category === name
        let searchUyur = item.name.toLowerCase().includes(axtarisSozu)

        return categoryUyur && searchUyur
    })

    renderProduct(filterdata)
    SrcCardData(filterdata)

    axtarisSozu === '' ? srccardlist.style.display = 'none' : srccardlist.style.display = 'block'
}

srchinput.addEventListener('input', function (e) {
    let keyword = e.target.value.toLowerCase()

    let filterdata = data.filter(item => {
        let categoryUyur = secilenCategory === 'Hamısı' ? true : item.category === secilenCategory
        let searchUyur = item.name.toLowerCase().includes(keyword)

        return categoryUyur && searchUyur
    })

    renderProduct(filterdata)
    SrcCardData(filterdata)

    e.target.value === '' ? srccardlist.style.display = 'none' : srccardlist.style.display = 'block'
})

function SrcCardData(arr) {
    srccardlist.innerHTML = arr.map(item =>
        `<div onclick="srcGetDetail('${item.id}')" class="srchcards">
            <img src="${item.photo}" class="srcimg" alt="">
            <div class="src-text">
                <h5>${item.name}</h5>
                <p>${item.price} AZN</p>
            </div>
        </div>`
    ).join('')

    if (arr.length === 0) {
        srccardlist.innerHTML = `<div class="notfound">Məhsul tapılmadı</div>`
    }
}

function srcGetDetail(id) {
    window.location.href = `detail.htm?id=${id}`
}

function getDetail(id) {
    window.location.href = `detail.htm?id=${id}`
}

function renderStats() {
    productCount.innerHTML = data.length

    let total = 0

    for (let i = 0; i < data.length; i++) {
        total += Number(data[i].price) * Number(data[i].num)
    }

    totalValue.innerHTML = total + ' AZN'
}

function deletmehsul(event, id) {
    event.stopPropagation()

    fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar')
            .then(res => res.json())
            .then(resData => {
                data = resData
                renderProduct(data)
                renderStats()
                srchinput.value = ''
                srccardlist.style.display = 'none'
                srccardlist.innerHTML = ''
            })
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

        document.getElementById('modal').classList.remove('show')
        document.getElementById('overlay').classList.remove('show')
    })
}