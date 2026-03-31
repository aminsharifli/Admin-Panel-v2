let detailBox = document.getElementById('detailBox')

function createSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function geriQayit() {
    window.location.href = 'index.html'
}

let params = new URLSearchParams(window.location.search)
let id = params.get('id')
let slug = params.get('slug')

function renderDetail(item) {
    if (!detailBox) return

    detailBox.innerHTML = `
        <div class="detail-card">
            <div class="detail-left">
                <img src="${item.photo}" alt="${item.name}">
            </div>
            <div class="detail-right">
                <div class="top-row">
                    <div class="category-badge">${item.category}</div>
                    <button onclick="geriQayit()" class="back-btn">← Geri qayıt</button>
                </div>
                <h1 class="product-title">${item.name}</h1>
                <div class="product-price">${item.price} AZN</div>
                <div class="info-box">
                    <div class="info-card">
                        <span>Kateqoriya</span>
                        <h4>${item.category}</h4>
                    </div>
                    <div class="info-card">
                        <span>Stokda qalan</span>
                        <h4>${item.num} ədəd</h4>
                    </div>
                    <div class="info-card">
                        <span>Məhsul ID</span>
                        <h4>${item.id}</h4>
                    </div>
                    <div class="info-card">
                        <span>Qiymət</span>
                        <h4>${item.price} AZN</h4>
                    </div>
                </div>
            </div>
        </div>
    `
}

function showNotFound() {
    if (!detailBox) return

    detailBox.innerHTML = `
        <div class="detail-card" style="justify-content:center; text-align:center;">
            <div class="detail-right" style="max-width:500px;">
                <h1 class="product-title">Məhsul tapılmadı</h1>
                <p>Link düzgün deyil və ya məhsul silinib.</p>
                <button onclick="geriQayit()" class="back-btn">← Geri qayıt</button>
            </div>
        </div>
    `
}

if (slug) {
    fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar')
        .then(res => res.json())
        .then(data => {
            let item = data.find(product => createSlug(product.name) === slug)

            if (item) renderDetail(item)
            else showNotFound()
        })
        .catch(() => showNotFound())
} else if (id) {
    fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar/${id}`)
        .then(res => res.json())
        .then(item => {
            if (item && item.id) renderDetail(item)
            else showNotFound()
        })
        .catch(() => showNotFound())
} else {
    showNotFound()
}
