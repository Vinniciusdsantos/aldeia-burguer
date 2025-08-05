// Recupera dados
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Referências do DOM
const listaProdutos = document.getElementById("listaProdutosAdmin");
const listaPedidos = document.getElementById("listaPedidosAdmin");
const estatisticas = document.getElementById("estatisticas");

// Função para renderizar produtos
function renderizarProdutos() {
  listaProdutos.innerHTML = "";
  produtos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nome}" width="80">
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <p><strong>${p.preco}</strong></p>
      <button onclick="editarProduto(${index})">Editar</button>
      <button onclick="excluirProduto(${index})">Excluir</button>
    `;
    listaProdutos.appendChild(div);
  });
}

// Adicionar produto
function adicionarProduto() {
  const nome = prompt("Nome do produto:");
  const descricao = prompt("Descrição:");
  const preco = prompt("Preço (ex: 19.90):");
  const img = prompt("URL da imagem:");
  if (nome && preco) {
    produtos.push({ nome, descricao, preco: `R$ ${preco}`, img });
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderizarProdutos();
  }
}

// Editar produto
function editarProduto(index) {
  const p = produtos[index];
  const nome = prompt("Novo nome:", p.nome);
  const descricao = prompt("Nova descrição:", p.descricao);
  const preco = prompt("Novo preço:", p.preco.replace("R$", "").trim());
  const img = prompt("Nova URL da imagem:", p.img);
  produtos[index] = { nome, descricao, preco: `R$ ${preco}`, img };
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderizarProdutos();
}

// Excluir produto
function excluirProduto(index) {
  if (confirm("Deseja excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    renderizarProdutos();
  }
}

// Renderizar pedidos
function renderizarPedidos() {
  listaPedidos.innerHTML = "";
  if (pedidos.length === 0) {
    listaPedidos.innerHTML = "<p>Nenhum pedido realizado ainda.</p>";
    return;
  }

  pedidos.forEach((pedido, index) => {
    const div = document.createElement("div");
    div.className = "pedido-card";
    div.innerHTML = `
      <h4>Pedido #${pedido.no} - Cliente: ${pedido.cliente}</h4>
      <p>Itens: ${pedido.itens.join(", ")}</p>
      <p>Valor: R$ ${pedido.valor}</p>
      <p>Pagamento: ${pedido.pagamento}</p>
      <button onclick="finalizarPedido(${index})">Finalizar</button>
    `;
    listaPedidos.appendChild(div);
  });
}

// Finalizar pedido
function finalizarPedido(index) {
  if (confirm("Confirmar finalização do pedido?")) {
    pedidos[index].status = "Finalizado";
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    renderizarPedidos();
    renderizarEstatisticas();
  }
}

// Estatísticas do dashboard
function renderizarEstatisticas() {
  const totalPedidos = pedidos.length;
  const pedidosFinalizados = pedidos.filter(p => p.status === "Finalizado").length;
  const faturamento = pedidos.reduce((acc, p) => acc + parseFloat(p.valor), 0);

  estatisticas.innerHTML = `
    <div class="stat">📦 Total de Pedidos: <strong>${totalPedidos}</strong></div>
    <div class="stat">✅ Pedidos Finalizados: <strong>${pedidosFinalizados}</strong></div>
    <div class="stat">💰 Faturamento: <strong>R$ ${faturamento.toFixed(2)}</strong></div>
    <div class="stat">👥 Clientes cadastrados: <strong>${clientes.length}</strong></div>
  `;
}

// Inicialização
renderizarProdutos();
renderizarPedidos();
renderizarEstatisticas();
