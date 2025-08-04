let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

function salvarProduto(e) {
  e.preventDefault();
  const id = document.getElementById("produtoId").value;
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const imagem = document.getElementById("imagem").value;

  if (id) {
    const index = produtos.findIndex(p => p.id == id);
    produtos[index] = { id, nome, descricao, preco, imagem };
  } else {
    const novo = { id: Date.now().toString(), nome, descricao, preco, imagem };
    produtos.push(novo);
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  e.target.reset();
  listarProdutos();
}

function listarProdutos() {
  const tbody = document.querySelector("#tabelaProdutos tbody");
  tbody.innerHTML = "";
  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.nome}</td><td>R$ ${p.preco.toFixed(2)}</td>
      <td>
        <button onclick='editarProduto("${p.id}")'>Editar</button>
        <button onclick='excluirProduto("${p.id}")'>Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function editarProduto(id) {
  const p = produtos.find(p => p.id === id);
  document.getElementById("produtoId").value = p.id;
  document.getElementById("nome").value = p.nome;
  document.getElementById("descricao").value = p.descricao;
  document.getElementById("preco").value = p.preco;
  document.getElementById("imagem").value = p.imagem;
}

function excluirProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  listarProdutos();
}

function listarPedidos() {
  const container = document.getElementById("pedidosLista");
  container.innerHTML = "";
  pedidos.forEach((pedido, idx) => {
    container.innerHTML += `<p><strong>Pedido ${idx + 1}:</strong> ${pedido.join(", ")}</p>`;
  });
}

document.getElementById("produtoForm").addEventListener("submit", salvarProduto);
listarProdutos();
listarPedidos();
