// SUBSTITUA pelo seu número com DDI e DDD, apenas dígitos.
// Exemplo fictício: 5511999999999
const numeroWhatsApp = "5519981718337";

function conversarWhatsApp(servico = "um orçamento") {
  const aviso = document.getElementById("aviso-whatsapp");
  if (!/^\d{12,15}$/.test(numeroWhatsApp)) {
    aviso.textContent = "Configure seu número no arquivo script.js para ativar o WhatsApp.";
    return;
  }
  const mensagem = `Olá, Yuri! Vi seu site e gostaria de conversar sobre ${servico}.`;
  const endereco = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(endereco, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-servico]").forEach(botao => {
  botao.addEventListener("click", () => conversarWhatsApp(botao.dataset.servico));
});
document.getElementById("contato-whatsapp").addEventListener("click", () => conversarWhatsApp());
document.getElementById("ano").textContent = new Date().getFullYear();



document.getElementById("form-orcamento")
  .addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("cliente").value;
    const servico = document.getElementById("servico").value;
    const descricao = document.getElementById("descricao").value;
    const prazo = document.getElementById("prazo").value;

    const mensagem =
      `Olá, Yuri! Gostaria de solicitar um orçamento.\n\n` +
      `Nome: ${nome}\n` +
      `Serviço: ${servico}\n` +
      `Projeto: ${descricao}\n` +
      `Prazo: ${prazo || "A combinar"}`;

    const endereco =
      `https://wa.me/${numeroWhatsApp}?text=` +
      encodeURIComponent(mensagem);

    window.open(endereco, "_blank", "noopener,noreferrer");
  });



/* CALCULADORA DE ORÇAMENTO */

const calcServico = document.getElementById("calc-servico");
const calcQuantidade = document.getElementById("calc-quantidade");
const calcTotal = document.getElementById("calc-total");
const calcWhatsapp = document.getElementById("calc-whatsapp");

function calcularOrcamento() {
  const preco = Number(calcServico.value);
  const quantidade = Math.min(
    100,
    Math.max(1, Number(calcQuantidade.value) || 1)
  );

  const total = preco * quantidade;

  calcTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return { total, quantidade };
}

calcServico.addEventListener("change", calcularOrcamento);
calcQuantidade.addEventListener("input", calcularOrcamento);

calcWhatsapp.addEventListener("click", function() {
  const { total, quantidade } = calcularOrcamento();

  const servico = calcServico.options[
    calcServico.selectedIndex
  ].text;

  const mensagem =
    `Olá, Yuri! Gostaria de solicitar um orçamento.\n\n` +
    `Serviço: ${servico}\n` +
    `Quantidade: ${quantidade}\n` +
    `Valor estimado: R$ ${total.toFixed(2)}\n\n` +
    `Gostaria de saber mais detalhes.`;

  const endereco =
    `https://wa.me/${numeroWhatsApp}?text=` +
    encodeURIComponent(mensagem);

  window.open(endereco, "_blank", "noopener,noreferrer");
});

calcularOrcamento();






