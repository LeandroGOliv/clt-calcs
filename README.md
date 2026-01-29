# 📚 Guia de Instalação e Execução

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão recomendada: >= 18)
- **pnpm**

Para instalar o pnpm (caso não tenha):

```bash
npm install -g pnpm
```

---

## 📥 Clonando o Repositório

```bash
git clone https://github.com/LeandroGOliv/clt-calcs.git
cd clt-calcs
```

---

## 📦 Instalando Dependências

Este projeto usa **pnpm workspaces**. Na raiz do projeto, execute apenas:

```bash
pnpm install
```

> ⚠️ **Importante:** Não é necessário rodar `pnpm install` dentro de `frontend` ou `backend`.

O pnpm irá:

- Instalar todas as dependências
- Deduplicar pacotes compartilhados
- Criar os links corretos entre frontend e backend

---

## ▶️ Rodando o Projeto em Desenvolvimento

Para subir frontend e backend juntos:

```bash
pnpm dev
```

### Serviços

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

### ▶️ Rodar Separadamente (opcional)

```bash
# Frontend
pnpm --filter frontend dev

# Backend
pnpm --filter backend dev
```

---

## 🏗️ Build

### Frontend

```bash
pnpm --filter frontend build
```

### Backend

```bash
pnpm --filter backend build
```

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js, Fastify, TypeScript

---

