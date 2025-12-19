# Desafio para o processo seletivo Growdev

Esse repositório é destinado ao desenvolvimento de um chat integrado com a SDK do Google Gemini. Para este desafio foi utilizada a biblioteca <a href="https://www.npmjs.com/package/@google/genai">google/genai</a> versão 1.30.0 instalada utilizando o NPM.

# 🚀 O Desafio

## 🧭 Visão geral

O objetivo deste desafio é desenvolver uma aplicação **full-stack** que simula um chat com inteligência artificial, integrando com o Gemini, modelo de
linguagem da Google.


## Detalhes e configurações do front e backend

Nas próximas seções serão descritas algumas caraterísticas do projeto, descrição das tecnologias e descrição das configurações e como rodar o projeto (back e front). Os dois projetos estão configurados e podem ser executados também através do docker, utilizando o docker-compose na raiz do projeto. A próxima seção irá conter o tutorial mostrando como rodar utilizando o docker, e nas seções a seguir iremos listar individualmente as caracaterísticas e os passos necessários para execução dos dois ambientes individualmente sem docker.

# 🐳 Rodando o Projeto com Docker Compose

Este projeto possui dois serviços principais:

- **Backend (NestJS)** → exposto na porta `3005`
- **Frontend (React + Vite)** → servido pelo Nginx na porta `8080`

---

## ⚙️ Pré-requisitos

- Docker instalado ([guia oficial](https://docs.docker.com/get-docker/))
- Docker Compose instalado ([guia oficial](https://docs.docker.com/compose/install/))

---

## 📌 Configuração das Variáveis de Ambiente

Antes de rodar o projeto, é **obrigatório** configurar as variáveis de ambiente.  
Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

```env
JWT_SECRET=supersecreto
MONGODB_DATABASE_URL=mongodb+srv://usuario:senha@host.mongodb.net/?appName=appexample
GEMINI_API_KEY=sua_chave_api_gemini
GEMINI_MODEL=gemini-2.5-flash
VITE_API_URL=http://localhost:3005
VITE_APP_NAME=Growzinho
```

### ▶️ Como rodar

```bash
docker-compose up --build
```

### Acesso aos serviços

Backend NestJS → http://localhost:3005

Frontend React → http://localhost:8080


### 1️⃣ Backend - NestJs + Google Gemini

Backend desenvolvido com NestJS integrado com Google Gemini AI. O sistema fornece uma API RESTful para autenticação, gerenciamento de conversas e integração em tempo real com o modelo de linguagem Gemini.

## 🛠️ Tecnologias Utilizadas

### **Core Stack**

- **Node.js** v24.11.1 (LTS)
- **NestJS** 11+ (Framework TypeScript)
- **TypeScript** (Linguagem principal)
- **MongoDB** (Banco de dados NoSQL)
- **Mongoose** (ODM para MongoDB)

### **Integrações e Bibliotecas**

- **@google/genai** (SDK oficial do Google Gemini)
- **JWT** (Autenticação com tokens)
- **bcrypt** (Hash de senhas)
- **class-validator** (Validação de DTOs)
- **class-transformer** (Transformação de objetos)

## 🔧 Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/Adrichard14/desafio-growdev
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e copie as o conteúdo do arquivo `.env.example`:

```env
JWT_SECRET=sua_chave_secreta_jwt_32_caracteres

# Banco de Dados MongoDB
MONGODB_DATABASE_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority

GEMINI_API_KEY=sua_chave_api_do_google_ai_studio
GEMINI_MODEL=gemini-2.0-flash-exp  # ou gemini-1.5-pro
```

### 4. Obtenha a API Key do Gemini

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API Key
3. Copie e cole no `.env` como `GEMINI_API_KEY`

## 🚀 Executando o Projeto

### Modo Desenvolvimento (com hot-reload)

```bash
npm run start:dev
```

O servidor estará disponível em: `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm run start:prod
```

## 📋 Pré-requisitos

- **Node.js** 18.x ou superior (Recomendado: 20.x LTS)
- **npm** 9.x ou superior
- **MongoDB Atlas** ou MongoDB local
- **Conta no Google AI Studio** (para API Key do Gemini)

### 2️⃣ Frontend - React + Vite + Shadcn + Tailwindcss

Frontend moderno desenvolvido com React + Vite para uma interface de chat interativa integrada com o Google Gemini AI. Interface responsiva e acessível com tema claro/escuro, desenvolvida seguindo as melhores práticas do React.

## 🛠️ Tecnologias Utilizadas

### **Core Stack**

- **React 19**
- **Vite 5+**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### **Gerenciamento de Estado e Dados**

- **Axios** - Cliente HTTP

### **UI/UX e Componentes**

- **shadcn/ui** - Componentes acessíveis prontos
- **Lucide React** - Ícones modernos

### **Qualidade de Código**

- **ESLint** - Linting avançado
- **Prettier** - Formatação consistente

## 📋 Pré-requisitos

- **Node.js** 20.x ou superior (Recomendado: 20.x LTS)
- **npm** 9.x ou superior
- **Backend NestJS** rodando (localhost:3005)
- **Conexão com internet** (para Gemini AI)

## 🔧 Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd gdash-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# API Backend
VITE_API_URL=http://localhost:3005/api
VITE_APP_NAME="Chat Gemini"
```

### 4. Configure shadcn/ui

```bash
npx shadcn-ui@latest init
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview
```

## 🎨 UI/UX Features

### **Tema Claro/Escuro**

- Toggle dinâmico
- Persistência no localStorage
- Respeita preferência do sistema
