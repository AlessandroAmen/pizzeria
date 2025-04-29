const pizze = [
  {
    nome: "Pizza Carbonara",
    immagine: "./immagini/Carbonara.jpg",
    link: "sitipizze/pizzacarbonara.html",
    prezzo: 12.00
  },
  {
    nome: "Pizza Margherita",
    immagine: "./immagini/DSCF4572-2048x2048.jpg",
    link: "#",
    prezzo: 8.00
  },
  {
    nome: "Patapizza",
    immagine: "./immagini/patapizza.jpeg",
    link: "#",
    prezzo: 14.00
  },
  {
    nome: "Pizza alla Diavola",
    immagine: "./immagini/pizza-alla-diavola.jpg",
    link: "#",
    prezzo: 13.00
  },
  {
    nome: "Pizza Capricciosa",
    immagine: "./immagini/Pizza-capricciosa.webp",
    link: "#",
    prezzo: 11.00
  },
  {
    nome: "Pizza Porcina",
    immagine: "./immagini/pizza-porcina.jpg",
    link: "#",
    prezzo: 15.00
  },
  {
    nome: "Pizza Zucca",
    immagine: "./immagini/pizza-zucca.jpg",
    link: "#",
    prezzo: 12.00
  },
  {
    nome: "Pizza Bronte",
    immagine: "./immagini/trasferimento.jpeg",
    link: "#",
    prezzo: 13.00
  }
];

let carrello = [];

// Funzione per generare le cards delle pizze
function generaPizze() {
  const container = document.querySelector('.container');
  const pizzeHTML = pizze.map(pizza => `
    <div class="card">
      <img src="${pizza.immagine}" alt="${pizza.nome}">
      <div class="card-content">
        <p class="testo">${pizza.nome}</p>
        <p class="prezzo">€${pizza.prezzo.toFixed(2)}</p>
        <button onclick="aggiungiAlCarrello('${pizza.nome}', ${pizza.prezzo})">
          Aggiungi al carrello
        </button>
      </div>
    </div>
  `).join('');

  container.innerHTML = pizzeHTML;
}

// Funzione per aggiungere al carrello
function aggiungiAlCarrello(nome, prezzo) {
  carrello.push({ nome, prezzo });
  aggiornaCarrello();
  
  // Animazione di feedback
  const button = event.target;
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);
}

// Funzione per aggiornare il carrello
function aggiornaCarrello() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  
  cartCount.textContent = carrello.length;
  
  cartItems.innerHTML = carrello.map(item => `
    <div class="cart-item">
      <span>${item.nome}</span>
      <span>€${item.prezzo.toFixed(2)}</span>
    </div>
  `).join('');
  
  const totale = carrello.reduce((sum, item) => sum + item.prezzo, 0);
  cartTotal.textContent = `Totale: €${totale.toFixed(2)}`;
}

// Funzione per aprire/chiudere il carrello
function toggleCarrello() {
  const cartPanel = document.querySelector('.cart-panel');
  cartPanel.classList.toggle('active');
}

// Funzionalità di ricerca
const btnCerca = document.getElementById('btnCerca');
const formRicerca = document.getElementById('formRicerca');
const searchInput = document.querySelector('.search-input');

btnCerca.addEventListener('click', () => {
  btnCerca.style.display = 'none';
  formRicerca.style.display = 'block';
  searchInput.focus();
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredPizze = pizze.filter(pizza => 
    pizza.nome.toLowerCase().includes(searchTerm)
  );
  
  const container = document.querySelector('.container');
  const pizzeHTML = filteredPizze.map(pizza => `
    <div class="card">
      <img src="${pizza.immagine}" alt="${pizza.nome}">
      <div class="card-content">
        <p class="testo">${pizza.nome}</p>
        <p class="prezzo">€${pizza.prezzo.toFixed(2)}</p>
        <button onclick="aggiungiAlCarrello('${pizza.nome}', ${pizza.prezzo})">
          Aggiungi al carrello
        </button>
      </div>
    </div>
  `).join('');

  container.innerHTML = pizzeHTML;
});

document.addEventListener('DOMContentLoaded', () => {
  generaPizze();
  
  document.body.insertAdjacentHTML('beforeend', `
    <div class="cart-icon" onclick="toggleCarrello()">
      🛒
      <span class="cart-count">0</span>
    </div>
    <div class="cart-panel">
      <h3>Il tuo carrello</h3>
      <div class="cart-items"></div>
      <div class="cart-total">Totale: €0.00</div>
      <button class="checkout-btn" onclick="alert('Funzionalità in sviluppo')">
        Procedi all'ordine
      </button>
    </div>
  `);
}); 