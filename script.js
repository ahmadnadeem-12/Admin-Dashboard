const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const galleryView = document.getElementById("galleryView");

// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Render products (Admin view)
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
    `;

    productList.appendChild(card);
  });
  renderGallery();
}

// Render gallery (User view)
function renderGallery() {
  galleryView.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
    `;

    galleryView.appendChild(card);
  });
}

// Add product
productForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  const newProduct = { name, price, image };
  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();

  productForm.reset();
});

// Delete product (only from Admin view)
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// Initial render
renderProducts();
