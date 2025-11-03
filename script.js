
// Simple static store script for nobt
const products = [
  {"id":"nobt-ice-mint","name":"Pod descartável — Ice Mint","price":29.90,"type":"Descartável"},
  {"id":"nobt-blue-razz","name":"Pod descartável — Blue Razz","price":29.90,"type":"Descartável"},
  {"id":"nobt-grape-freeze","name":"Pod descartável — Grape Freeze","price":29.90,"type":"Descartável"},
  {"id":"nobt-mango-ice","name":"Pod descartável — Mango Ice","price":29.90,"type":"Descartável"},
  {"id":"nobt-classic-tobacco","name":"Pod recarregável — Classic Tobacco","price":69.90,"type":"Recarregável"},
  {"id":"nobt-menthol-fresh","name":"Pod recarregável — Menthol Fresh","price":69.90,"type":"Recarregável"}
];

function money(n){ return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

document.getElementById('year').textContent = new Date().getFullYear();

const grid = document.getElementById('product-grid');
products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="assets/${p.id}.png" alt="${p.name}" onerror="this.onerror=null;this.src='assets/placeholder.png'">
    <h4>${p.name}</h4>
    <p class="desc">${(p.type)} — Sabor premium</p>
    <div class="price">${money(p.price)}</div>
    <div class="actions">
      <a class="btn" href="#" onclick="addToCart('${p.id}',event)">Adicionar</a>
      <a class="btn" href="#" onclick="buyNow('${p.id}',event)">Comprar</a>
    </div>
  `;
  grid.appendChild(card);
});

// Very simple cart in memory
let cart = {};

function addToCart(id,event){
  event.preventDefault();
  cart[id] = (cart[id] || 0) + 1;
  alert('Adicionado ao carrinho. Abra o WhatsApp para finalizar a compra.');
  updateWhatsAppLink();
}

function buyNow(id,event){
  event.preventDefault();
  cart = {}; cart[id] = 1;
  openWhatsAppCheckout();
}

function updateWhatsAppLink(){
  // updates the floating button to prefill message with cart items
  document.getElementById('whatsapp-float').href = generateWhatsAppLink();
  document.getElementById('whatsapp-contact').href = generateWhatsAppLink();
}

function generateWhatsAppLink(){
  const phone = '+556993253927'; // <- Substitua pelo número do WhatsApp com DDI e DDD, ex: 5511999999999
  const lines = ['Olá, quero fazer um pedido da nobt:'];
  let total = 0;
  for(const id in cart){
    const p = products.find(x=>x.id===id);
    if(!p) continue;
    lines.push(`- ${p.name} x ${cart[id]} = ${money(p.price*cart[id])}`);
    total += p.price * cart[id];
  }
  lines.push(`Total: ${money(total)}`);
  lines.push('Nome: ');
  lines.push('Endereço: ');
  const text = encodeURIComponent(lines.join('\\n'));
  return `https://wa.me/${phone}?text=${text}`;
}

function openWhatsAppCheckout(){
  const url = generateWhatsAppLink();
  window.open(url,'_blank');
}

// init default
updateWhatsAppLink();
