
document.addEventListener("DOMContentLoaded", () => {
  const produtosContainer = document.getElementById("produtos");

  db.collection("produtos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "produto-card";
      card.innerHTML = `
        <img src="assets/images/${data.imagem}" alt="${data.nome}" />
        <h3>${data.nome}</h3>
        <p>${data.descricao}</p>
        <strong>R$ ${data.preco.toFixed(2)}</strong>
        <button onclick="adicionarAoCarrinho('${doc.id}')">Adicionar</button>
      `;
      produtosContainer.appendChild(card);
    });
  });
});

function adicionarAoCarrinho(id) {
  alert("Produto adicionado ao carrinho: " + id);
}
