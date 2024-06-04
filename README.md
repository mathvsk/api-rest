<h1 align="center">
  Transactions API-REST
</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/MIT-maker?style=for-the-badge&label=License&labelColor=%23303030&color=%23808080)

API de transações bancárias, utilizando [Fastify](https://fastify.dev/), [TypeScript](https://www.typescriptlang.org/), e [Vitest](https://vitest.dev/) (para testes unitários). O armazenamento e a criação do banco de dados são feitos utilizando [Knex](https://knexjs.org/) (query builder) com migrations e SQLite para persistência de dados.

## Visão Geral
Esta API oferece uma maneira fácil e rápida de gerenciar transações bancárias, com endpoints para recuperar transações, obter o saldo da conta e cadastrar novas transações.

## Como usar
Clone o projeto e execute os seguintes comandos:
```bash
npm install
npm run dev
```
_O comando npm run dev iniciará o servidor localmente. Certifique-se de ter o Node.js instalado em sua máquina._

### Testes
Para executar os testes unitários, utilize o comando:
```bash
npm run test
```

## API Endpoints
A URL padrão do projeto é http://localhost:3000. Para alterar a porta, crie um arquivo .env e defina a variável **PORT**. Consulte o arquivo [.env.example](.env.example) para um exemplo.

As requisições **GET** utilizam cookies para autenticação do usuário. Primeiro, é necessário chamar a rota **POST** para cadastrar o cookie no cabeçalho.

| Rota                                 | Descrição                            |
|--------------------------------------|--------------------------------------|
| <kbd>GET /transactions/</kbd>        | Recupera todas as transações.        |
| <kbd>GET /transactions/{id}</kbd>    | Recupera uma transação.              |
| <kbd>GET /transactions/balance</kbd> | Recupera o balanço(resumo) da conta. |
| <kbd>POST /transactions/</kbd>       | Cadastra uma nova transação.         |

### Schemas
#### POST /transactions/
```json
{
  "title": "string",
  "amount": "number",
  "type": "debit | credit"
}
```
_Certifique-se de fornecer dados válidos para cada campo conforme o esquema acima._



Este README fornece uma visão geral detalhada do projeto, incluindo instruções claras sobre como configurar, usar e testar a API. Se tiver alguma dúvida ou sugestão, não hesite em entrar em contato ou contribuir para o projeto!
