# AI PDF Chat

Aplicacao web em Next.js para interagir com documentos PDF em uma interface de chat.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalacao

```bash
npm install
```

## Rodando o projeto

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, acesse `http://localhost:3000`.

## Scripts disponiveis

### Desenvolvimento

```bash
npm run dev
```

### Build de producao

```bash
npm run build
```

### Storybook

```bash
npm run storybook
```

Abre a biblioteca de componentes em `http://localhost:6006` com documentacao automatica e exemplos dos estados principais da interface.

### Build estatico do Storybook

```bash
npm run build-storybook
```

### Rodar a aplicacao em producao

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Testes

O projeto usa Jest com ambiente `jsdom`.

### Rodar todos os testes

```bash
npm test
```

ou

```bash
npm run test
```

### Rodar testes em modo watch

```bash
npm run test:watch
```

### Rodar testes com cobertura

```bash
npm run test:coverage
```

## Componentes documentados

O Storybook inclui historias com `autodocs` para os componentes principais:

- `AppShell`
- `Header`
- `Sidebar`
- `DocumentList`
- `UploadForm`
- `ChatPanel`
- `SourceList`
