const products = [
  {robux:415, price:"9,99", pix:"00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f4352040000530398654049.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***6304AD85"},
  {robux:500, price:"15,00", pix:"00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540515.005802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***6304433D"},
  {robux:1000, price:"29,99", pix:"00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540529.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63042608"},
  {robux:1149, price:"39,99", pix:"00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540539.995802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63041CFF"},
  {robux:1686, price:"59,00", pix:"00020126580014br.gov.bcb.pix0136f0579eb7-6bd2-4062-8a85-5e115ea20f43520400005303986540559.005802BR5925MIKAEL EDUARDO RODRIGUES 6009SAO PAULO62070503***63044381"}
];

const packageRoot = document.getElementById("packages");
const storePage = document.getElementById("storePage");
const paymentPage = document.getElementById("paymentPage");
const money = value => "R$ " + value;

products.forEach((product, index) => {
  const button = document.createElement("button");
  button.className = "package";
  button.type = "button";
  button.innerHTML = `
    <img src="https://d148q8eudkfkrh.cloudfront.net/pdp/roblox/96237769.webp" alt="">
    <span><strong class="qty">${product.robux}</strong><span class="unit">ROBUX</span></span>
    <span class="price">${money(product.price)}</span>`;
  button.addEventListener("click", () => openPayment(index));
  packageRoot.appendChild(button);
});

function openPayment(index) {
  const item = products[index];
  document.getElementById("paymentAmount").textContent = money(item.price);
  document.getElementById("paymentPackage").textContent = item.robux + " Robux";
  document.getElementById("pixCode").value = item.pix;
  document.getElementById("copyStatus").textContent = "";
  storePage.classList.add("hidden");
  paymentPage.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
}
document.getElementById("backBtn").addEventListener("click", () => {
  paymentPage.classList.add("hidden");
  storePage.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
});
document.getElementById("copyBtn").addEventListener("click", async () => {
  const code = document.getElementById("pixCode").value;
  try {
    await navigator.clipboard.writeText(code);
    document.getElementById("copyStatus").textContent = "Código copiado. Confira os dados no seu banco.";
  } catch {
    const field = document.getElementById("pixCode");
    field.select();
    document.execCommand("copy");
    document.getElementById("copyStatus").textContent = "Código selecionado/copiad​o. Confira os dados no seu banco.";
  }
});

document.getElementById("loginBtn").addEventListener("click", () => {
  showToast("Área de login demonstrativa — nenhum cadastro ou autenticação está ativo.");
});

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  document.getElementById("toastText").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}
const demoMessages = [
  "Demonstração: um visitante selecionou um pacote.",
  "Demonstração: alguém está conferindo as opções.",
  "Demonstração: um pacote foi visualizado agora."
];
let messageIndex = 0;
setTimeout(() => {
  showToast(demoMessages[messageIndex]);
  setInterval(() => {
    messageIndex = (messageIndex + 1) % demoMessages.length;
    showToast(demoMessages[messageIndex]);
  }, 14000);
}, 5000);
