let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active')
    navbar.classList.remove('active')
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active')
    search.classList.remove('active')
}

window.onscroll = () => {
    navbar.classList.remove('active')
    search.classList.remove('active')
}

// Array untuk menyimpan item di cart
let cart = [];

// Ambil elemen dari DOM
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const addToCartButtons = document.querySelectorAll('.products .box a');

// Fungsi untuk menghitung total harga
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.innerText = `Rp ${total}`;
}

// Fungsi untuk memperbarui tampilan cart
function updateCartDisplay() {
  cartItems.innerHTML = ''; // Kosongkan cart sebelum menampilkan yang baru

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} (${item.quantity})</span>
      <span>Rp ${item.price * item.quantity}</span>
    `;
    cartItems.appendChild(cartItem);
  });

  // Update jumlah item di cart dan total harga
  cartCount.innerText = cart.length;
  calculateTotal();
}

// Fungsi untuk menambahkan produk ke cart
function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Tambah quantity jika produk sudah ada di cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Tambah produk baru
  }

  updateCartDisplay(); // Perbarui tampilan cart
}

// Event listener untuk tombol "Add to Cart"
addToCartButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const productItem = event.target.closest('.box');
    const productName = productItem.querySelector('h3').innerText;
    const productPrice = parseInt(productItem.querySelector('.content span').innerText.replace('Rp ', '').replace('.', ''));

    const product = {
      id: productName,
      name: productName,
      price: productPrice
    };

    addToCart(product); // Panggil fungsi addToCart
  });
});

// Event listener untuk checkout (bisa digunakan untuk mengosongkan cart)
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Checkout complete! Terima kasih telah berbelanja.');
  cart = []; // Kosongkan cart
  updateCartDisplay(); // Perbarui tampilan cart setelah checkout
});
