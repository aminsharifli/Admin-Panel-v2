let catlist = document.getElementById('categoryButtons')
let categorySelect = document.getElementById('category')
let categoryCount = document.getElementById('categoryCount')

let catData = []

function getCategories() {
    fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/category')
        .then(res => res.json())
        .then(catdata => {
            catData = catdata

            catlist.innerHTML = `<button onclick="filtrProduct('Hamısı', this)" class="category-btn active">Hamısı</button>`
            categorySelect.innerHTML = `<option value="">Kateqoriya seç</option>`

            catdata.map(c => {
                catlist.innerHTML += `<button onclick="filtrProduct('${c.category}', this)" class="category-btn">${c.title}</button>`
                categorySelect.innerHTML += `<option value="${c.category}">${c.title}</option>`
            })

            categoryCount.innerHTML = catdata.length
        })
}