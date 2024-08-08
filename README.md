# Tarefa Backend Caveo

## Objetivo

Nesta tarefa, o candidato deverá configurar um projeto backend utilizando Node.js e integrar a aplicação com AWS Cognito para controlar a autorização de rotas. A tarefa inclui a configuração de um banco de dados com PostgreSQL, o uso do ORM TypeORM, e a inicialização do ambiente de desenvolvimento com Docker Compose.

## Requisitos

1. **Inicialização do Repositório**
   - Configure um novo repositório Node.js.
   - Utilize o framework **KoaJS**.
   - Adicione **TypeORM** para gerenciar o banco de dados.
   - Utilize **PostgreSQL** como banco de dados relacional.

2. **Configuração com Docker Compose**
   - Configure um arquivo `docker-compose.yml` para inicializar a API e o banco de dados PostgreSQL.
   - Certifique-se de que o ambiente esteja isolado e fácil de replicar.

3. **Integração com AWS Cognito**
   - Crie uma conta AWS, se necessário.
   - Configure um User Pool no AWS Cognito.
   - Integre a API com AWS Cognito para autenticação de usuários.

4. **Middleware de Autorização**
   - Desenvolva um middleware em KoaJS para controlar a autorização das rotas.
   - O middleware deve bloquear o acesso de usuários não autenticados.
   - Integre a verificação do JWT gerado pelo Cognito para proteger as rotas.

5. **Escopos e Permissões**
   - Crie diferentes escopos de usuário (por exemplo, `admin`, `usuário`).
   - Configure permissões específicas para cada escopo, garantindo que apenas usuários com as permissões corretas possam acessar determinadas rotas.

## Referências

- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do KoaJS](https://koajs.com/)
- [Documentação do TypeORM](https://typeorm.io/)
