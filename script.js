
// ======================================
// ROBUX STORE - JAVASCRIPT COMPLETO
// ======================================

// PACOTES E CÓDIGOS PIX

const products = [
  {
    robux: 415,
    price: "9,99",
    pix: "00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f4352040000530398654049.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***6304AD85"
  },
  {
    robux: 500,
    price: "15,00",
    pix: "00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540515.005802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***6304433D"
  },
  {
    robux: 1000,
    price: "29,99",
    pix: "00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540529.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63042608"
  },
  {
    robux: 1149,
    price: "39,99",
    pix: "00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540539.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63041CFF"
  },
  {
    robux: 1686,
    price: "59,00",
    pix: "00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540559.005802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63044381"
  }
];

// ÍCONE ROBUX

const iconUrl =
"https://d148q8eudkfkrh.cloudfront.net/pdp/roblox/96237769.webp";

// ELEMENTOS DO SITE

const packages = document.getElementById("packages");
const storePage = document.getElementById("storePage");
const paymentPage = document.getElementById("paymentPage");

// ======================================
// CRIAR PACOTES AUTOMATICAMENTE
// ======================================

products.forEach((product, index) => {

  const button = document.createElement("button");

  button.className = "package";
  button.type = "button";

  button.innerHTML = `
    <img src="${iconUrl}" alt="Robux">

    <span>
      <strong class="qty">${product.robux}</strong>
      <span class="unit">ROBUX</span>
    </span>

    <span class="price">
      R$ ${product.price}
    </span>
  `;

  button.addEventListener("click", () => {
    openPayment(index);
  });

  packages.appendChild(button);

});

// ======================================
// ABRIR SEGUNDA PÁGINA DE PAGAMENTO
// ======================================

function openPayment(index) {

  const product = products[index];

  document.getElementById("paymentAmount").textContent =
    "R$ " + product.price;

  document.getElementById("paymentPackage").textContent =
    product.robux + " Robux";

  document.getElementById("pixCode").value =
    product.pix;

  document.getElementById("copyStatus").textContent = "";

  storePage.classList.add("hidden");
  paymentPage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// ======================================
// VOLTAR PARA A LOJA
// ======================================

document.getElementById("backBtn").addEventListener("click", () => {

  paymentPage.classList.add("hidden");
  storePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

// ======================================
// COPIAR CÓDIGO PIX
// ======================================

document.getElementById("copyBtn").addEventListener("click", async () => {

  const field = document.getElementById("pixCode");
  const code = field.value;

  try {

    await navigator.clipboard.writeText(code);

    document.getElementById("copyStatus").textContent =
      "Código copiado! Confira os dados no banco.";

  } catch (error) {

    field.focus();
    field.select();

    const success = document.execCommand("copy");

    document.getElementById("copyStatus").textContent =
      success
        ? "Código copiado! Confira os dados no banco."
        : "Selecione e copie o código manualmente.";

  }

});

// ======================================
// NOTIFICAÇÕES DE COMPRAS DEMONSTRATIVAS
// ======================================

const demoPurchases = [
  { robux: 415, price: "9,99" },
  { robux: 500, price: "15,00" },
  { robux: 1000, price: "29,99" },
  { robux: 1149, price: "39,99" },
  { robux: 1686, price: "59,00" }
];

let lastPurchase = -1;

function showRandomPurchase() {

  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");

  // Escolher pacote aleatório sem repetir
  // imediatamente o pacote anterior

  let randomIndex;

  do {
    randomIndex = Math.floor(
      Math.random() * demoPurchases.length
    );
  } while (
    demoPurchases.length > 1 &&
    randomIndex === lastPurchase
  );

  lastPurchase = randomIndex;

  const purchase = demoPurchases[randomIndex];

  toastText.textContent =
    `Compra feita: pacote de ${purchase.robux} Robux por R$ ${purchase.price}`;

  toast.classList.add("show");

  // Notificação permanece visível por 5 segundos

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);

  // Próxima notificação entre 10 e 15 segundos

  const nextTime =
    10000 + Math.random() * 5000;

  setTimeout(showRandomPurchase, nextTime);

}

// Primeira notificação após 4 segundos

setTimeout(showRandomPurchase, 4000);

// ======================================
// CONTADOR DEMONSTRATIVO DE VISITANTES
// ======================================

const visitorCount =
  document.getElementById("visitorCount");

if (visitorCount) {
  visitorCount.textContent = "1.000+";
}

// ======================================
// FIM DO JAVASCRIPT
// ======================================
