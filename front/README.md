
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

Crie um arquivo `.env` na raiz do projeto e copie o conteúdo de `.env.example` e preencha de acordo com a configuração do backend:

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
