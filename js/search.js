let listcontainer = document.getElementById('listcontainer')
let catlist = document.getElementById('catlist')
let srchinput = document.getElementById('srchinput')
let srccardlist = document.getElementById('srccardlist')
let data = []


function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar')
    .then(res => res.json())
    .then(resData => {
        data = resData
        renderProduct(data)
        statlariYaz()
    })

function renderProduct(arr) {
    listcontainer.innerHTML = arr.map(item =>
        `<div onclick="getDetail('${item.id}')" class="mehsul">
            <div><img src="${item.photo}" class="sekil"></div>
            <div>${item.name}</div>
            <div>${item.category}</div>
            <div>${item.num} ədəd</div>
            <div>${item.price} AZN</div>
            <div>
                <button onclick="deletmehsul(event,'${item.id}')" class="silbtn">Sil</button>
            </div>
        </div>`
    ).join('')
}

function filtrProduct(name) {
    const filterdata = (name === 'all') ? data : data.filter(f => f.category === name)
    renderProduct(filterdata)
}

srchinput.addEventListener('input', (e) => {
    axtarmehsul(e.target.value)
    e.target.value == '' ? srccardlist.style.display = 'none' : srccardlist.style.display = 'block'
})

function axtarmehsul(srchvalue) {
    const keyword = srchvalue.toLowerCase()
    const axtarilmismehsul = data.filter(item => item.name.toLowerCase().includes(keyword))

    renderProduct(axtarilmismehsul)
    SrcCardData(axtarilmismehsul)
}

function SrcCardData(arr) {
    srccardlist.innerHTML = arr.map(item =>
        `<div onclick="srcGetDetail('${item.id}')" class="srchcards">
            <img src="${item.photo}" class="srcimg" alt="">
            <div class="text">
                <h5>${item.name}</h5>
                <p>${item.price} AZN</p>
            </div>
        </div>`
    ).join('')
}

function srcGetDetail(id) {
    let product = data.find(item => item.id === id)
    if (!product) return

    let slug = createSlug(product.name)
    window.location.href = `detail.htm?slug=${encodeURIComponent(slug)}`
}

function getDetail(id) {
    let product = data.find(item => item.id === id)
    if (!product) return

    let slug = createSlug(product.name)
    window.location.href = `detail.htm?slug=${encodeURIComponent(slug)}`
}

function statlariYaz() {
    document.getElementById('productCount').innerHTML = data.length

    let cem = 0

    data.map(item => {
        cem += Number(item.price) * Number(item.num)
    })

    document.getElementById('totalValue').innerHTML = cem + ' AZN'
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
                statlariYaz()
                srccardlist.style.display = 'none'
                srchinput.value = ''
            })
    })
}