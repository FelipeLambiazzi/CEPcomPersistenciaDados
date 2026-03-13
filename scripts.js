const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const btnLimpar = document.getElementById("btnLimpar");

const campos = {
  nome: document.getElementById("nome"),
  email: document.getElementById("email"),
  cep: document.getElementById("cep"),
  logradouro: document.getElementById("logradouro"),
  numero: document.getElementById("numero"),
  complemento: document.getElementById("complemento"),
  bairro: document.getElementById("bairro"),
  cidade: document.getElementById("cidade"),
  estado: document.getElementById("estado"),
};

const CHAVE_STORAGE = "cadastroUsuario";

function exibirMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function limparMensagem() {
  mensagem.textContent = "";
  mensagem.className = "";
}

function formatarCEP(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);

  if (numeros.length > 5) {
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }

  return numeros;
}

function obterDadosFormulario() {
  return {
    nome: campos.nome.value,
    email: campos.email.value,
    cep: campos.cep.value,
    logradouro: campos.logradouro.value,
    numero: campos.numero.value,
    complemento: campos.complemento.value,
    bairro: campos.bairro.value,
    cidade: campos.cidade.value,
    estado: campos.estado.value,
  };
}

function salvarNoLocalStorage() {
  const dados = obterDadosFormulario();
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
}

function restaurarDados() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (!dadosSalvos) return;

  const dados = JSON.parse(dadosSalvos);

  campos.nome.value = dados.nome || "";
  campos.email.value = dados.email || "";
  campos.cep.value = dados.cep || "";
  campos.logradouro.value = dados.logradouro || "";
  campos.numero.value = dados.numero || "";
  campos.complemento.value = dados.complemento || "";
  campos.bairro.value = dados.bairro || "";
  campos.cidade.value = dados.cidade || "";
  campos.estado.value = dados.estado || "";
}

function limparEndereco() {
  campos.logradouro.value = "";
  campos.bairro.value = "";
  campos.cidade.value = "";
  campos.estado.value = "";
}

async function buscarCEP() {
  const cepLimpo = campos.cep.value.replace(/\D/g, "");

  if (cepLimpo.length === 0) {
    limparEndereco();
    salvarNoLocalStorage();
    return;
  }

  if (cepLimpo.length !== 8) {
    exibirMensagem("Digite um CEP válido com 8 números.", "erro");
    limparEndereco();
    salvarNoLocalStorage();
    return;
  }

  limparMensagem();

  try {
    exibirMensagem("Buscando endereço...", "info");

    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.erro) {
      limparEndereco();
      salvarNoLocalStorage();
      exibirMensagem("CEP não encontrado.", "erro");
      return;
    }

    campos.logradouro.value = dados.logradouro || "";
    campos.bairro.value = dados.bairro || "";
    campos.cidade.value = dados.localidade || "";
    campos.estado.value = dados.uf || "";

    salvarNoLocalStorage();
    exibirMensagem("Endereço preenchido com sucesso.", "sucesso");
  } catch (erro) {
    limparEndereco();
    salvarNoLocalStorage();
    exibirMensagem("Não foi possível consultar o CEP.", "erro");
    console.error("Erro ao buscar CEP:", erro);
  }
}

campos.cep.addEventListener("input", (event) => {
  event.target.value = formatarCEP(event.target.value);
  salvarNoLocalStorage();
});

campos.cep.addEventListener("blur", buscarCEP);

Object.values(campos).forEach((campo) => {
  if (campo.id !== "cep") {
    campo.addEventListener("input", salvarNoLocalStorage);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  salvarNoLocalStorage();
  exibirMensagem("Cadastro salvo no navegador com sucesso.", "sucesso");
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  limparEndereco();
  localStorage.removeItem(CHAVE_STORAGE);
  exibirMensagem("Dados removidos com sucesso.", "info");
});

document.addEventListener("DOMContentLoaded", () => {
  restaurarDados();
});