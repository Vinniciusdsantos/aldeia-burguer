
const produtos = [
  {
    id: 1,
    nome: "Burguer Clássico",
    descricao: "Pão, carne 120g, queijo, alface e tomate.",
    preco: 15.00,
    imagem: "assets/img/burguer1.png"
  },
  {
    id: 2,
    nome: "Cheddar Bacon",
    descricao: "Pão, carne 150g, cheddar cremoso e bacon.",
    preco: 18.00,
    imagem: "assets/img/burguer2.png"
  },
  {
    id: 3,
    nome: "Frango Crocante",
    descricao: "Pão, filé de frango empanado, maionese e salada.",
    preco: 16.00,
    imagem: "assets/img/burguer3.png"
  },
  {
    id: 4,
    nome: "Duplo Smash",
    descricao: "2 carnes smash, queijo, cebola crispy e molho.",
    preco: 20.00,
    imagem: "assets/img/burguer4.png"
  },
  {
    id: 5,
    nome: "Vegetariano",
    descricao: "Pão, hambúrguer de grão-de-bico, salada e queijo.",
    preco: 14.00,
    imagem: "assets/img/burguer5.png"
  }
];

const carrinho = [];

function renderProdutos() {
  const container = document.getElementById('cardapio');
  container.innerHTML = "";
  produtos.forEach(p => {
    container.innerHTML += `
      <div class='produto'>
        <img src='${p.imagem}' alt='${p.nome}' />
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <strong>R$ ${p.preco.toFixed(2)}</strong><br>
        <button onclick='addCarrinho(${p.id})'>Adicionar</button>
      </div>
    `;
  });
}

function renderCarrinho() {
  const container = document.getElementById('carrinho');
  container.innerHTML = "<h3>Seu Carrinho:</h3>";
  if (carrinho.length === 0) {
    container.innerHTML += "<p>Vazio</p>";
    return;
  }
  let total = 0;
  carrinho.forEach(item => {
    const prod = produtos.find(p => p.id === item);
    container.innerHTML += `<p>${prod.nome} - R$ ${prod.preco.toFixed(2)}</p>`;
    total += prod.preco;
  });
  container.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
  container.innerHTML += `<a href="https://wa.me/5521999999999?text=Olá! Quero fazer o seguinte pedido:%0A${carrinho.map(i => produtos.find(p => p.id === i).nome).join("%0A")}" target="_blank"><button>Finalizar Pedido</button></a>`;
}

function addCarrinho(id) {
  carrinho.push(id);
  renderCarrinho();
}

window.onload = () => {
  renderProdutos();
  renderCarrinho();
};
