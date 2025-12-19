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
