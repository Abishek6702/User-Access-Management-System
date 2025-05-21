
# 🛡️ User Access Management System

A full-stack application to manage software access within an organization using role-based permissions and JWT authentication.

---

## 🚀 Setup Instructions

### 📦 Backend (Node.js + Express + TypeORM)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/user-access-system.git
cd user-access-system/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Fill in the required variables:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

4. **Set up the database**

Make sure PostgreSQL is running, then run:

```bash
npm run typeorm migration:run
```

5. **Start the server**

```bash
npm run dev
```

> API is now running at `http://localhost:5000/api`

---

### 🖥️ Frontend (React)

1. **Navigate to frontend directory**

```bash
cd ../frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the React app**

```bash
npm start
```

> React app will run at `http://localhost:3000`

---

## 🔐 API Documentation

> All protected routes require `Authorization: Bearer <token>`

### 👤 Authentication

#### `POST /api/auth/signup`

Register a new user (default role: Employee).

**Request Body:**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secure123"
}
```

#### `POST /api/auth/login`

Login and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "role": "Employee"
}
```

---

### 🧩 Software Management (Admin only)

#### `POST /api/software`

Create new software.

**Headers:**
`Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "Figma",
  "description": "Design Tool",
  "accessLevels": ["Read", "Write", "Admin"]
}
```

#### `GET /api/software`

Retrieve list of software (all roles).

#### `PUT /api/software/:id`

Update software (Admin only).

**Body:**
```json
{
  "name": "Figma Updated",
  "description": "New Description",
  "accessLevels": ["Read", "Write"]
}
```

#### `DELETE /api/software/:id`

Delete a software entry.

---

### 📝 Access Requests

#### `POST /api/requests` (Employee)

Submit software access request.

**Body:**
```json
{
  "softwareId": "uuid",
  "accessType": "Read",
  "reason": "Need for work"
}
```

#### `GET /api/requests/mine` (Employee)

Get the current user's requests.

---

### ✅ Request Management (Manager)

#### `GET /api/requests/pending`

Get all pending access requests.

#### `GET /api/requests`

Get all access requests.

#### `PATCH /api/requests/:id`

Approve or reject a request.

**Body:**
```json
{
  "status": "approved"
}
```

---

## 🗂️ Frontend Routes

| Path               | Description                     |
|--------------------|---------------------------------|
| `/signup`          | Registration page               |
| `/login`           | Login form                      |
| `/create-software` | Admin adds software             |
| `/request-access`  | Employees request software      |
| `/pending-requests`| Managers approve/reject access  |

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, TypeORM
- **Frontend:** React
- **Database:** PostgreSQL
- **Auth:** JWT, bcrypt
- **Tools:** dotenv, nodemon

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or support, please contact [yourname@example.com](mailto:yourname@example.com)
