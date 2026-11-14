
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

const iconUrl =
  "https://d148q8eudkfkrh.cloudfront.net/pdp/roblox/96237769.webp";

const packages = document.getElementById("packages");

const storePage = document.getElementById("storePage");
const paymentPage = document.getElementById("paymentPage");

// Criar os cinco pacotes
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

// Abrir pagamento correspondente
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

// Voltar para a loja
document.getElementById("backBtn").addEventListener("click", () => {

  paymentPage.classList.add("hidden");
  storePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Copiar Pix
document.getElementById("copyBtn").addEventListener("click", async () => {

  const field = document.getElementById("pixCode");
  const code = field.value;

  try {

    await navigator.clipboard.writeText(code);

  } catch (error) {

    field.select();
    field.setSelectionRange(0, code.length);

    const success = document.execCommand("copy");

    if (!success) {
      document.getElementById("copyStatus").textContent =
        "Selecione e copie o código manualmente.";
      return;
    }
  }

  document.getElementById("copyStatus").textContent =
    "Código copiado! Confira o destinatário no banco.";
});

// Notificações demonstrativas
const messages = [
  "Demonstração: um visitante está olhando os pacotes.",
  "Demonstração: alguém selecionou um pacote.",
  "Demonstração: um visitante está conferindo o Pix."
];

let messageIndex = 0;

function showNotification(message) {

  const toast = document.getElementById("toast");

  document.getElementById("toastText").textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Exibir notificações de demonstração
setTimeout(() => {

  showNotification(messages[messageIndex]);

  setInterval(() => {

    messageIndex =
      (messageIndex + 1) % messages.length;

    showNotification(messages[messageIndex]);

  }, 15000);

}, 5000);

// Contador demonstrativo, não representa visitantes reais
document.getElementById("visitorCount").textContent = "1.000+";
