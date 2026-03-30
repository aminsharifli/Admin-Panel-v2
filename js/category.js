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
                catlist.innerHTML += `
                    <div class="catItem">
                        <button onclick="filtrProduct('${c.category}', this)" class="category-btn">
                            ${c.title}
                        </button>
                        <span onclick="deleteCategory(event,'${c.id}')" class="catDelete">✕</span>
                    </div>
                `

                categorySelect.innerHTML += `
                    <option value="${c.category}">
                        ${c.title}
                    </option>
                `
            })

            categoryCount.innerHTML = catdata.length
        })
}

function openCatModal() {
    document.getElementById('catModal').classList.add('show')
    document.getElementById('overlay').classList.add('show')
}

function closeCatModal() {
    document.getElementById('catModal').classList.remove('show')
    document.getElementById('overlay').classList.remove('show')
}

function addCategory() {
    let catName = document.getElementById('catName')

    if (catName.value === '') {
        alert('Kateqoriya adı yaz')
        return
    }

    let yeniCat = {
        title: catName.value,
        category: catName.value
    }

    fetch('https://69c261047518bf8facbe280c.mockapi.io/admin-panel/category', {
        method: 'POST',
        body: JSON.stringify(yeniCat),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(res => res.json())
    .then(() => {
        getCategories()
        catName.value = ''
        closeCatModal()
    })
}
function deleteCategory(event, id) {
    event.stopPropagation()

    fetch(`https://69c261047518bf8facbe280c.mockapi.io/admin-panel/category/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        getCategories()
    })
}