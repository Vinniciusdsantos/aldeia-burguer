
function saveName() {
  const name = document.getElementById("nameInput").value;
  localStorage.setItem("clienteNome", name);
  document.getElementById("welcome").innerText = "Olá, " + name + "!";
}

function playSound() {
  document.getElementById("clickSound").play();
}

function enviarPedido() {
  const pedidos = parseInt(localStorage.getItem("pedidos") || "0") + 1;
  localStorage.setItem("pedidos", pedidos);
  updateFidelidade();
  const msg = encodeURIComponent("Olá, quero fazer um pedido na Aldeia Burguer!");
  const url = `https://wa.me/5521999999999?text=${msg}`;
  window.open(url, "_blank");
}

function updateFidelidade() {
  const pedidos = parseInt(localStorage.getItem("pedidos") || "0");
  const progress = document.getElementById("fidelidade");
  const text = document.getElementById("progress-text");
  progress.value = pedidos % 6;
  text.innerText = pedidos % 6;
}

window.onload = function () {
  const nome = localStorage.getItem("clienteNome");
  if (nome) {
    document.getElementById("welcome").innerText = "Olá, " + nome + "!";
    document.getElementById("nameInput").value = nome;
  }
  updateFidelidade();
};
