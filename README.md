# 🚀 Cadastro de Usuários com ViaCEP

Uma aplicação web simples e funcional para **cadastro de usuários**, com **preenchimento automático de endereço pelo CEP** usando a **API ViaCEP** e **persistência de dados no navegador** com **Web Storage API (`localStorage`)**.

---

## 📌 Sobre o projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos importantes do **JavaScript moderno**, incluindo:

- consumo de API com **Fetch API**
- manipulação do DOM
- uso de **Local Storage**
- preenchimento automático de formulário
- persistência de dados após recarregar a página

Ao digitar um **CEP válido**, a aplicação consulta a API do **ViaCEP** e preenche automaticamente os campos de endereço.  
Além disso, todos os dados digitados no formulário são salvos no navegador, evitando perda de informações ao atualizar a página.

---

## ✨ Funcionalidades

✅ Cadastro de usuário com formulário simples  
✅ Busca automática de endereço pelo CEP  
✅ Integração com a API do ViaCEP  
✅ Salvamento automático dos dados no navegador  
✅ Restauração automática dos dados ao recarregar a página  
✅ Botão para limpar os dados salvos  
✅ Interface limpa e organizada  

---

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Fetch API**
- **Web Storage API (`localStorage`)**
- **ViaCEP**

---

## 📂 Estrutura do projeto

```bash
cadastro-usuarios/
│
├── index.html
├── styles.css
└── scripts.js
