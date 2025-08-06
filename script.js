
let carrinho = [];

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalElem = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = \`\${item.nome} - R$ \${item.preco.toFixed(2)} 
      <button onclick="removerItem(\${index})">❌</button>\`;
    lista.appendChild(li);
  });

  totalElem.innerText = "Total: R$ " + total.toFixed(2);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {
  const produtosContainer = document.getElementById("produtos");

  fetch("data/produtos.json")
    .then(res => res.json())
    .then(produtos => {
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = \`
          <img src="assets/images/\${produto.imagem}" alt="\${produto.nome}" />
          <h3>\${produto.nome}</h3>
          <p>\${produto.descricao}</p>
          <strong>R$ \${produto.preco.toFixed(2)}</strong>
          <button onclick='adicionarAoCarrinho(\${JSON.stringify(produto)})'>Adicionar</button>
        \`;
        produtosContainer.appendChild(card);
      });
    });

  document.getElementById("finalizar-btn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "flex";
  });

  document.getElementById("enviar-pedido").addEventListener("click", () => {
    const numero = document.getElementById("numero").value;
    if (!numero || carrinho.length === 0) return alert("Preencha o número e adicione itens.");

    let texto = "*Pedido Aldeia Burguer:*\n";
    carrinho.forEach((item) => {
      texto += \`- \${item.nome} (R$ \${item.preco.toFixed(2)})\n\`;
    });
    const total = carrinho.reduce((soma, i) => soma + i.preco, 0);
    texto += "\n*Total: R$ " + total.toFixed(2) + "*";

    const msg = encodeURIComponent(texto);
    window.open("https://wa.me/55" + numero.replace(/\D/g, "") + "?text=" + msg, "_blank");
  });
});

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
}
