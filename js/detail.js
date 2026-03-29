let detailBox = document.getElementById('detailBox')

let params = new URLSearchParams(window.location.search)
let id = params.get('id')

fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/mehsullar/${id}`)
    .then(res => res.json())
    .then(item => {
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
    })

function geriQayit() {
    window.history.back()
}