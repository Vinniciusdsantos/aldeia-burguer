// Carrega produtos do localStorage (ou array vazio se não houver)
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Carrinho armazenado no localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Referências do DOM
const lista = document.getElementById("listaProdutos");
const carrinhoDiv = document.getElementById("carrinho");
const totalSpan = document.getElementById("total");

// Função para renderizar produtos no cardápio
function renderizarProdutos() {
  lista.innerHTML = "";
  if (produtos.length === 0) {
    lista.innerHTML = "<p>Nenhum produto disponível no momento.</p>";
    return;
  }

  produtos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>${p.preco}</strong></p>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
    `;
    lista.appendChild(div);
  });
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(index) {
  const produto = produtos[index];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Remover item do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Renderizar o carrinho
function renderizarCarrinho() {
  carrinhoDiv.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <span>${item.nome} - ${item.preco}</span>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(div);

    total += parseFloat(item.preco.replace("R$", "").replace(",", "."));
  });

  totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar pedido
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Pedido realizado com sucesso!");
  carrinho = [];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Inicializa página
renderizarProdutos();
renderizarCarrinho();
