
document.addEventListener("DOMContentLoaded", () => {
  const produtosContainer = document.getElementById("produtos");

  fetch("data/produtos.json")
    .then((res) => res.json())
    .then((produtos) => {
      produtos.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
          <img src="assets/images/${produto.imagem}" alt="${produto.nome}" />
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <strong>R$ ${produto.preco.toFixed(2)}</strong>
          <button onclick="alert('Adicionado ao carrinho!')">Adicionar</button>
        `;
        produtosContainer.appendChild(card);
      });
    });
});
