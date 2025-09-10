# 🛒 Product Management Application

A simple full-stack product management application that demonstrates **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB Atlas (database)** integration.  
It supports basic CRUD operations like adding, viewing, editing, deleting,searching and sorting products.

---

## 🚀 Live Demo
- [Product Management App](https://product-managament-kappa.vercel.app/)  
---

## 📌 Features
- ✅ View all products in a clean grid layout  
- ✅ Add new products with a form  
- ✅ Delete products with confirmation  
- ✅ Edit existing products  
- ✅ Search products by name  
- ✅ Sort products by name,price (low → high / high → low)  
- ✅ MongoDB Atlas cloud database integration  

---

## 🛠️ Tech Stack
### Frontend
- React.js (Functional components + Hooks)
- Basic CSS
- React Toastify (for alerts/notifications)
- Vite (for fast bundling)

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)

### Database
- MongoDB Atlas (cloud database)

### Deployment
- Frontend on Vercel
- Backend on Render
- Database on MongoDB Atlas

---


## ⚡ API Endpoints
Base URL: `https://product-managament-eidf.onrender.com`

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/products`       | Get all products      |
| POST   | `/api/products`       | Add a new product     |
| PUT    | `/api/products/:id`   | Update a product      |
| DELETE | `/api/products/:id`   | Delete a product      |

---

## 🧑‍💻 Setup & Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/product-management.git
cd product-management ```

### 2. Setup Backend
cd backend
npm install

### 3. Create a .env file in backend/:
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

### 4. Run server:
npm start

### 5. Setup Frontend
cd frontend
npm install
npm run dev


