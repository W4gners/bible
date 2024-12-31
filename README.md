# Conforto Bíblico

Uma aplicação web que oferece conforto e orientação através de versículos bíblicos baseados em como você está se sentindo.

## Funcionalidades

- Interface moderna e intuitiva
- Busca de versículos bíblicos baseada em sentimentos
- Imagens de fundo dinâmicas relacionadas ao contexto
- Compartilhamento em redes sociais
- Design responsivo
- Animações suaves

## Tecnologias Utilizadas

- React.js
- Vite
- Tailwind CSS
- Axios
- React Icons
- React Share

## APIs Utilizadas

- [Bíblia Digital API](https://www.abibliadigital.com.br/api)
- [Unsplash API](https://unsplash.com/developers)

## Configuração do Projeto

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd bible-comfort-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Adicione suas chaves de API:
  - `VITE_BIBLE_API_TOKEN`: Token da API da Bíblia Digital
  - `VITE_UNSPLASH_ACCESS_KEY`: Chave de acesso da API do Unsplash

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

## Deploy

O projeto está configurado para deploy no Supabase:

1. Configure o Supabase CLI
2. Execute o deploy:
```bash
supabase deploy
```

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter pull requests.
