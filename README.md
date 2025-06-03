# CRM Backend API

A simple backend API for CRM system with user authentication and basic CRUD operations.

## Quick Start

1. Clone the repository:
```bash
git clone <your-repository-url>
cd crm-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
```bash
mysql -u root -p
```
Then in MySQL:
```sql
CREATE DATABASE crm_db;
USE crm_db;
source setup_database.sql
```

4. Create `.env` file:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_db
JWT_SECRET=your_secret_key
```

5. Start the server:
```bash
npm start
```

## Default Login
- Username: `admin`
- Password: `admin123`

## Main API Endpoints

### Auth
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`

### Customers
- Get all: `GET /api/customers`
- Add new: `POST /api/customers`
- Update: `PUT /api/customers/:id`
- Delete: `DELETE /api/customers/:id`

### Leads
- Get all: `GET /api/leads`
- Add new: `POST /api/leads`
- Update: `PUT /api/leads/:id`
- Delete: `DELETE /api/leads/:id`

### Deals
- Get all: `GET /api/deals`
- Add new: `POST /api/deals`
- Update: `PUT /api/deals/:id`
- Delete: `DELETE /api/deals/:id`

### Tasks
- Get all: `GET /api/tasks`
- Add new: `POST /api/tasks`
- Update: `PUT /api/tasks/:id`
- Delete: `DELETE /api/tasks/:id`

## Requirements
- Node.js
- MySQL
- npm

## Support
For help, create an issue in the repository.
