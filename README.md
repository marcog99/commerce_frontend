# Commerce Frontend

## Installation Guide

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend API running and accessible

### Steps

1. **Clonar el repositorio**

```bash
git clone https://github.com/your-username/commerce_frontend.git
cd commerce_frontend
git fetch
git checkout master
```
2. **Instalar Dependencias**

```bash
npm install --force
yarn install
```

5. **Abre SQL Server Management Studio o cualquier cliente SQL y ejecuta**

```code
CREATE DATABASE ECOMMERCE;
GO
```

6. **Ejecutar la base de datos la cual se encuentra en el archivo BD_STRUCTURE.sql**

7. **Actualizar valores de archivo .env**

DB_TYPE=mssql
DB_HOST=GTLTECMGARCIA\\SQLEXPRESS
DB_PORT=1433
DB_USERNAME=admin
DB_PASSWORD=123
DB_NAME=ECOMMERCE
JWT_SECRET=MARCOPC303GARCIA9903
PORT=3000
ORIGIN=http://localhost:3001


4. **Iniciar la Aplicacion**
```bash
npm run dev
yarn dev
```



