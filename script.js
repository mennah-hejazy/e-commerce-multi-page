document.addEventListener('DOMContentLoaded', () => {
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
function renderProducts(products) {
    const group1Products = products.slice(0, 4); 
    const group2Products = products.slice(4);
    const productLists = document.querySelectorAll('.product-list');
    productLists.forEach(productList => {
        const group1Container = productList.querySelector('.group-1');
        const group2Container = productList.querySelector('.group-2');
        const viewAllButton = productList.querySelector('.view-all');
        group1Container.innerHTML = '';
        group2Container.innerHTML = '';
        group1Products.forEach(product => {
            const productItem = createProductItem(product);
            if (productItem) {
                group1Container.appendChild(productItem);
            }
        });
        group2Products.forEach(product => {
            const productItem = createProductItem(product);
            if (productItem) {
                group2Container.appendChild(productItem);
            }
        });
        viewAllButton.addEventListener('click', () => {
            toggleGroupVisibility(group2Container, viewAllButton);
        });
    });
}
function createProductItem(product) {
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    img.src = product.image;
    listItem.appendChild(img);
    const title = document.createElement('h2');
    title.textContent = product.title;
    listItem.appendChild(title);
    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;
    listItem.appendChild(price);
    const rate = document.createElement('p');
    rate.textContent = `Rating: ${product.rating.rate}`;
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa','fa-star');
    rate.appendChild(starIcon);
    listItem.appendChild(rate);
    const link = document.createElement('a');
    link.classList.add('link');
    link.href =  `product/product.html?id=${product.id}`;
    link.textContent = 'View Details';
    listItem.appendChild(link);
    console.log(product.id);
    return listItem;
}
function toggleGroupVisibility(group2Container, viewAllButton) {
    const isGroup2Visible = group2Container.classList.contains('hidden');
    if (isGroup2Visible) {
        group2Container.classList.remove('hidden');
        group2Container.classList.add('visible');
        viewAllButton.textContent = 'View less';
    } else {
        group2Container.classList.remove('visible');
        group2Container.classList.add('hidden');
        viewAllButton.textContent = 'View All';
    }
}
});
const menuIcon = document.querySelector('.menu-icon');
const menuContainer = document.querySelector('.menu-container');
function toggleMenu(menuIcon, menuContainer){
    const isMenuIconVisible = menuIcon.classList.contains('visible');
    if(isMenuIconVisible){
        menuIcon.classList.add('hidden');
        menuIcon.classList.remove('visible');
        menuContainer.classList.add('visible');
        menuContainer.classList.remove('hidden');
    }
    console.log(menuContainer);
}
menuIcon.addEventListener('click', ()=> {
    toggleMenu(menuIcon, menuContainer);
});
function disappeared(menuContainer, menuIcon){
    const menuContainerVisibility = menuContainer.classList.contains('visible');
    if(menuContainerVisibility){
        menuContainer.classList.add('hidden');
        menuContainer.classList.remove('visible');
        menuIcon.classList.remove('hidden');
        menuIcon.classList.add('visible');
    }
}
menuContainer.addEventListener('click', () => {
    disappeared(menuContainer, menuIcon);
});


