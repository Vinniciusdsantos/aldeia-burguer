
let carrinho = [];
let total = 0;
let pedidos = parseInt(localStorage.getItem('pedidos') || '0');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const nome = item.getAttribute('data-nome');
        const preco = parseFloat(item.getAttribute('data-preco'));
        carrinho.push({ nome, preco });
        total += preco;
        atualizarCarrinho();
    });
});

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    lista.innerHTML = '';
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$${item.preco}`;
        lista.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function enviarPedido() {
    pedidos++;
    localStorage.setItem('pedidos', pedidos);
    atualizarFidelidade();

    let texto = 'Pedido Aldeia Burguer:%0A';
    carrinho.forEach(item => {
        texto += `- ${item.nome} (R$${item.preco})%0A`;
    });
    texto += `%0ATotal: R$${total.toFixed(2)}`;
    const numero = '21999999999'; // <-- Altere aqui com seu número real
    window.open(`https://wa.me/55${numero}?text=${texto}`, '_blank');
}

function atualizarFidelidade() {
    document.getElementById('fidelidade-contador').textContent = `Pedidos feitos: ${pedidos % 6} / 5`;
    if (pedidos > 0 && pedidos % 6 === 0) {
        document.getElementById('fidelidade-bonus').textContent = '🎉 Parabéns! Você ganhou um lanche GRÁTIS!';
    } else {
        document.getElementById('fidelidade-bonus').textContent = '';
    }
}

atualizarFidelidade();
