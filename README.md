# boilerplate-backend
Boilerplate Backend Typescript, Express, Prisma, Jest, Supertest and JWT Authentication

# Criando .env
```console
touch .env
```
# Configurando o .env
```json
DATABASE_URL="file:./dev.db"
SECRET_KEY="codigo ou hash usando pelo token jwt"
```
# Instalando as dependências
```console
npm install
```
# Gerando o banco sqlite3
```console
npx prisma migrate dev --name init
```

# Rodando os testes integrado
```console
npm test
```
