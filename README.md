# BlogPost - Modern Blogging Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)

<div align="center">
  <img src="frontend/src/assets/react.svg" alt="BlogPost Logo" width="120" />
  <h3>A modern full-stack blogging platform</h3>
</div>

## 🚀 Features

- **User Authentication** - Secure JWT-based login and registration system
- **Content Management** - Create, read, update, and delete blog posts
- **Media Support** - Upload and manage images for blog posts
- **Responsive Design** - Works on desktop and mobile devices
- **User Profiles** - Author information and post history
- **RESTful API** - Well-structured backend API for easy integration
- **MySQL Database** - Reliable data storage with efficient queries

## 📋 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Multer** - File uploads

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **CSS** - Styling

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or newer)
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
   ```

4. **Create the database**

   ```bash
   mysql -u root -p < schema.sql
   # Or run:
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

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🔍 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post (requires auth)
- `PUT /api/posts/:id` - Update a post (requires auth)
- `DELETE /api/posts/:id` - Delete a post (requires auth)

## 🌐 Deployment

### Backend

- Deploy to any Node.js hosting service (Heroku, Render, DigitalOcean)
- Configure environment variables
- Set up a MySQL database instance

### Frontend

- Build the React app (`npm run build`)
- Deploy static files to Netlify, Vercel, or GitHub Pages

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

## 📸 Screenshots

_[Add screenshots of your application here]_

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
- [MySQL](https://www.mysql.com/)
- [JSON Web Tokens](https://jwt.io/)

---

<div align="center">
  Made with ❤️ by [Your Name]
</div>
