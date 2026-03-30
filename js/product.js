let listcontainer = document.getElementById('productList')
let productCount = document.getElementById('productCount')
let totalValue = document.getElementById('totalValue')

let srchinput = document.getElementById('srchinput')
let srccardlist = document.getElementById('srccardlist')

let data = []
let secilenCategory = 'Hamısı'
let problemliler = []

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
    if (!listcontainer) return

    listcontainer.innerHTML = arr.map(item =>
        `<div class="table-row ${problemliler.includes(item.id) ? 'problemli' : ''}" onclick="getDetail('${item.id}')">
            <div><img src="${item.photo}" alt=""></div>
            <div>${item.name}</div>
            <div>${item.category}</div>
            <div>${item.num} ədəd</div>
            <div class="price">${item.price} AZN</div>
            <div style="display:flex; gap:6px;">
                <button class="delete-btn" onclick="deletmehsul(event,'${item.id}')">Sil</button>
                <button class="problem-btn" onclick="problemEt(event,'${item.id}')">⚠</button>
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

    if (btn) btn.classList.add('active')

    let soz = ''
    if (srchinput) soz = srchinput.value.toLowerCase()

    let filterdata = data.filter(item => {
        let categoryUyur = name === 'Hamısı' ? true : item.category === name
        let searchUyur = item.name.toLowerCase().includes(soz)
        return categoryUyur && searchUyur
    })

    renderProduct(filterdata)
    SrcCardData(filterdata)

    if (srccardlist) {
        if (soz === '') srccardlist.style.display = 'none'
        else srccardlist.style.display = 'block'
    }
}

if (srchinput) {
    srchinput.addEventListener('input', function (e) {
        let keyword = e.target.value.toLowerCase()

        let filterdata = data.filter(item => {
            let categoryUyur = secilenCategory === 'Hamısı' ? true : item.category === secilenCategory
            let searchUyur = item.name.toLowerCase().includes(keyword)
            return categoryUyur && searchUyur
        })

        renderProduct(filterdata)
        SrcCardData(filterdata)

        if (!srccardlist) return

        if (e.target.value === '') srccardlist.style.display = 'none'
        else srccardlist.style.display = 'block'
    })
}

function SrcCardData(arr) {
    if (!srccardlist) return

    if (arr.length === 0) {
        srccardlist.innerHTML = `<div class="notfound">Məhsul tapılmadı</div>`
        return
    }

    srccardlist.innerHTML = arr.map(item =>
        `<div onclick="srcGetDetail('${item.id}')" class="srchcards">
            <img src="${item.photo}" class="srcimg" alt="">
            <div class="src-text">
                <h5>${item.name}</h5>
                <p>${item.price} AZN</p>
            </div>
        </div>`
    ).join('')
}

function srcGetDetail(id) {
    window.location.href = `detail.htm?id=${id}`
}

function getDetail(id) {
    window.location.href = `detail.htm?id=${id}`
}

function renderStats() {
    if (productCount) productCount.innerHTML = data.length

    let total = 0
    for (let i = 0; i < data.length; i++) {
        total += Number(data[i].price)
    }

    if (totalValue) totalValue.innerHTML = total + ' AZN'
}

function deletmehsul(event, id) {
    event.stopPropagation()

    fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        problemliler = problemliler.filter(item => item !== id)

        getProducts()

        if (srchinput) srchinput.value = ''
        if (srccardlist) {
            srccardlist.style.display = 'none'
            srccardlist.innerHTML = ''
        }
    })
}

function addProduct() {
    let title = document.getElementById('title')
    let category = document.getElementById('category')
    let image = document.getElementById('image')
    let price = document.getElementById('price')
    let count = document.getElementById('stock')

    if (!title || !category || !image || !price || !count) return

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

        let modal = document.getElementById('modal')
        let overlay = document.getElementById('overlay')

        if (modal) modal.classList.remove('show')
        if (overlay) overlay.classList.remove('show')
    })
}

function problemEt(event, id) {
    event.stopPropagation()

    if (problemliler.includes(id)) {
        problemliler = problemliler.filter(item => item !== id)
    } else {
        problemliler.push(id)
    }

    let soz = ''
    if (srchinput) soz = srchinput.value.toLowerCase()

    let filterdata = data.filter(item => {
        let categoryUyur = secilenCategory === 'Hamısı' ? true : item.category === secilenCategory
        let searchUyur = item.name.toLowerCase().includes(soz)
        return categoryUyur && searchUyur
    })

    renderProduct(filterdata)
    SrcCardData(filterdata)

    if (srccardlist) {
        if (soz === '') srccardlist.style.display = 'none'
        else srccardlist.style.display = 'block'
    }
}

function problemModalAc() {
    let problemModal = document.getElementById('problemModal')
    let overlay = document.getElementById('overlay')
    let problemList = document.getElementById('problemList')

    if (!problemModal || !overlay || !problemList) return

    let filterdata = data.filter(item => problemliler.includes(item.id))

    if (filterdata.length === 0) {
        problemList.innerHTML = `<p>Problemli məhsul yoxdur</p>`
    } else {
        problemList.innerHTML = filterdata.map(item =>
            `<div class="problemCard" onclick="srcGetDetail('${item.id}')">
                <img src="${item.photo}" alt="">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price} AZN</p>
                </div>
            </div>`
        ).join('')
    }

    problemModal.classList.add('show')
    overlay.classList.add('show')
}

function problemModalBagla() {
    let problemModal = document.getElementById('problemModal')
    let overlay = document.getElementById('overlay')

    if (problemModal) problemModal.classList.remove('show')
    if (overlay) overlay.classList.remove('show')
}