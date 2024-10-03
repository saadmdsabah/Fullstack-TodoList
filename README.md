# 🌟 Fullstack ToDoList Application 🚀

Welcome to the Fullstack ToDoList Application, a powerful task management system built to streamline your daily productivity! This app utilizes modern technologies to provide a secure, feature-rich, and user-friendly experience for managing tasks and profiles.

# 🌟 Features:
🔐 Authentication: Enjoy a smooth and secure login and registration process with password reset via email.

### 🔑 Authorization: 
Manage your access securely with Passport.js, ensuring only authorized users can access specific features.

### 🏠 Home Page: 
Easily navigate your tasks and priorities from a clean, organized home interface.

### 👤 User Profiles:

Edit and update your profile with personal information like name and email. See your task history and accomplishments.

### 📋 Task Management:

Add, edit, view, and mark tasks as complete. Sort tasks by priority (high, medium, low) and deadline for better organization.

### 🗂️ Task Sorting: 
Automatically organize tasks by priority and deadline, ensuring you tackle what's most important first.

### ⚙️ Technologies Used:

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Frontend:** HTML, CSS, JavaScript

**Authentication:** Passport.js

**File Storage:** Cloudinary

**Dockerized:** Yes, for easy deployment and scalability!

## Create a .env file or text file for Environment Variables:
**Variables:** MONGO_URL, PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, DEFAULT_PROFILE_PIC, LOGO_URL, EMAIL, PASSWORD, JWT_SECRET

MONGO_URL - After creating an account on https://www.mongodb.com/, create a Cluster you will get the URL or Refer https://youtu.be/ACUXjXtG8J4?feature=shared

PORT - Optional 

CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET - Create an Account on https://cloudinary.com/ you will get these three credentials or refer https://youtu.be/hGzVY88q8I0?feature=shared

DEFAULT_PROFILE_PIC, LOGO_URL - Default profile picture, Application Logo image upload them in Cloudinary, and you will get the URL

EMAIL - Valid Email from which you can send a Password Reset Link to the User's Email

PASSWORD - Create an App passwords in Your Email refer https://youtu.be/dq3chv2PZVk?feature=shared


## Installation Using Git clone:

1. **Clone the Repository**:
```bash
git clone https://github.com/saadmdsabah/Fullstack-TodoList
```
2. **Install dependencies**:
  ```bash
npm install bcryptjs cloudinary connect-mongo dotenv ejs express express-session mongoose multer multer-storage-cloudinary passport passport-local
```
3. **Run the Application**:
  ```bash
node app.js
```
4. **Access the Application**:
```bash
http://localhost:3000
```

# How to Pull and Use the Image:

### Pull the Image from Docker: 
```bash
docker push saadsabahuddin/mern-fullstack-todolist
```

### Run the Docker Image: 
```bash
docker run -it -p 3000:3000 --env-file <.env_file_path> <Image_name>
```

### How to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request with a clear explanation of your changes. 🎯

## License 📜
This project is licensed under the MIT License. You're free to use, modify, and distribute the code as long as the original author is credited. 🎉
