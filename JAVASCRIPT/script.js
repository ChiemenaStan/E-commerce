const themeBtn = document.querySelector(".theme-toggle");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }
});

const products = [
  {
    id: 1,
    name: "Basketball",
    price: 3.2,
    image: "IMAGES/basket.jpg",
  },
  {
    id: 2,
    name: "Sneakers",
    price: 5.22,
    image: "IMAGES/sneakers.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: 2.21,
    image: "IMAGES/headpones.jpg",
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 3.2,
    image: "IMAGES/smartwatch.jpg",
  },
];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtns = document.querySelectorAll(".cart-btn");

const cartCount = document.querySelector(".cart-count");

cartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.id);

    const selectedProduct = products.find((product) => {
      return product.id === productId;
    });
    cart.push(selectedProduct);
    cartCount.textContent = cart.length;

    displayCart();

    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

const cartIcon = document.querySelector(".cart-icon");

const cartSidebar = document.querySelector(".cart-sidebar");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.toggle("show-cart");
});

const cartItems = document.querySelector(".cart-items");

const cartTotal = document.querySelector(".cart-total");

function displayCart() {
  console.log("display cart");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const cartProduct = document.createElement("div");
    cartProduct.classList.add("cart-product");
    cartProduct.innerHTML = `<img src = "${item.image}">
    <h4>${item.name}</h4> <p>${item.price}</p>  <button class="remove-btn">Remove</button>`;

    const removeBtn = cartProduct.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.textContent = cart.length;

      const deTotal = document.createElement("div");
      displayCart();
    });

    cartItems.appendChild(cartProduct);
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
