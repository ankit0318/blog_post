# BlogPost - Modern Blogging Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

<div align="center">
  <img src="frontend/src/assets/react.svg" alt="BlogPost Logo" width="120" />
  <h3>A modern full-stack blogging platform</h3>
</div>

## 🚀Live URL 
<br/>
<a href='https://blog-post-frontend-prvt.onrender.com/'>Blog-Post-Frontend-Live-url</a>
<br/>
<a href='https://blog-post-ltyk.onrender.com/'>Blog-Post-Backend-Live-url</a>
<br/>
<a href='https://blog-post-ltyk.onrender.com/docs'>Swagger Docs url</a>
<br/>

## 🚀 Features

- **User Authentication** - Secure JWT-based login and registration system
- **Content Management** - Create, read, update, and delete blog posts
- **Media Support** - Upload and manage images for blog posts with cover image functionality
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **User Profiles** - Author information, post history, and profile avatar generation
- **RESTful API** - Well-structured backend API with Swagger documentation
- **MySQL Database** - Reliable data storage with efficient queries
- **API Documentation** - Interactive Swagger UI for API testing and documentation

## 📋 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express v5.1.0** - Modern web framework
- **MySQL v3.14.0** (mysql2) - Database
- **JWT v9.0.2** - Authentication
- **Multer v1.4.5** - File uploads
- **Swagger v6.2.8** - API documentation
- **bcryptjs v3.0.2** - Password hashing

### Frontend

- **React v19.0.0** - UI library (Latest version)
- **React Router v7.5.1** - Navigation
- **Vite v6.3.1** - Fast build tool
- **Modern CSS** - Responsive styling

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or newer)
- MySQL
- Git

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blog_post.git
   cd blog_post
   ```

2. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:

   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=blog_db
   JWT_SECRET=your_jwt_secret
   UPLOAD_DIR=uploads
   ```

4. **Create the database**

   ```bash
   # Run these helper scripts:
   node createDatabase.js
   node createTables.js
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the frontend directory:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔍 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in a user
- `GET /auth/profile` - Get user profile (requires auth)

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post (requires auth)
- `PUT /posts/:id` - Update a post (requires auth)
- `DELETE /posts/:id` - Delete a post (requires auth)

### API Documentation

- `/docs` - Interactive Swagger UI documentation

## 🌐 Deployment

### Backend

- Currently deployed on Render
- Configure environment variables on hosting platform
- Set up a MySQL database instance

### Frontend

- Build the React app (`npm run build`)
- Deploy static files to Render (using \_redirects for SPA routing)
- Current deployment: https://blog-post-ltyk.onrender.com

## 📝 Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  cover_image VARCHAR(255),
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 💻 Project Structure

```
blog_post/
├── backend/                # Express API
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth middleware
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── uploads/            # User uploaded images
│   ├── server.js           # Main application file
│   └── swagger.js          # API documentation config
└── frontend/               # React application
    ├── public/             # Static assets
    └── src/
        ├── components/     # React components
        ├── assets/         # Images and resources
        ├── App.jsx         # Main application component
        └── main.jsx        # Entry point
```

## 📸 Key Features

- **JWT Authentication**: Secure login and registration system
- **Responsive UI**: Modern design that works on all devices
- **Profile Avatars**: Dynamic user avatar generation from initials
- **Image Uploads**: Cover image upload and management for posts
- **Interactive API Docs**: Testing and exploring the API via Swagger UI
- **SPA Routing**: Seamless navigation with React Router

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [MySQL](https://www.mysql.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Render](https://render.com/) for hosting

---


