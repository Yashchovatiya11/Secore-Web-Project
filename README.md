# Secure Web Development Project – OWASP Juice Shop

## 📌 Project Overview
This project focuses on identifying and mitigating security vulnerabilities in the OWASP Juice Shop application, which is an intentionally vulnerable web application used for security training.

The objective of this project is to analyse common web security issues and apply secure coding practices to improve the overall security of the application.

---

## 🎯 Key Features
- User authentication (login functionality)
- Product search system
- REST API communication
- Client-server architecture (Angular + Node.js)

---

## 🔐 Security Objectives
The project addresses critical web vulnerabilities based on OWASP Top 10, including:

- Cross-Site Scripting (XSS)
- Broken Access Control
- Sensitive Data Exposure
- Broken Authentication
- Improper Error Handling

---

## 🛠 Security Improvements

The following fixes were implemented:

### 1. XSS Protection
- Replaced unsafe `[innerHTML]` with safe interpolation
- Implemented input sanitization

### 2. Access Control
- Restricted admin endpoint access
- Added `403 Forbidden` response for unauthorized users

### 3. Sensitive Data Protection
- Blocked exposure of configuration API
- Prevented leakage of OAuth and system details

### 4. Authentication Security
- Implemented rate limiting
- Prevented brute-force login attempts (`429 Too Many Requests`)

### 5. Error Handling
- Replaced detailed system errors with generic messages

---

## 📁 Project Structure

frontend/ → Angular frontend
backend/ → Node.js server logic
routes/ → API endpoints
models/ → Database models
lib/ → Security utilities


---

## ⚙️ Setup and Installation

1. Clone the repository:

git clone https://github.com/Yashchovatiya11/Secore-Web-Project.git


2. Navigate to project folder:

cd juice-shop


3. Install dependencies:

npm install


4. Run the application:

npm start


5. Open in browser:

http://localhost:3000


---

## 🚀 Usage Guidelines

- Login using test credentials
- Use search functionality to test input handling
- Try accessing admin endpoints (should be blocked)
- Observe rate limiting after multiple login attempts

---

## 🧪 Testing Process

Security testing was performed using:

- Browser Developer Tools (Network & Console)
- Manual payload testing (XSS injection)
- API endpoint testing
- Code review (SAST)

### Key Results:
- XSS successfully mitigated
- Unauthorized access blocked
- Brute-force protection implemented

---

## 📊 Vulnerabilities Identified

| # | Vulnerability | Status |
|--|-------------|--------|
| 1 | Cross-Site Scripting (XSS) | Fixed |
| 2 | Broken Access Control | Fixed |
| 3 | Sensitive Data Exposure | Fixed |
| 4 | Broken Authentication | Fixed |
| 5 | Error Handling Issues | Fixed |
| 6 | Credential Exposure (HTTP) | Identified |

---

## 👨‍💻 Author

Yash Chovatiya  
Student ID: 25126903


The development of this project followed an iterative and exploratory approach. During the initial stages, significant time was spent researching, testing different solutions, and identifying security vulnerabilities within the application.

Rather than committing incomplete or experimental code, changes were consolidated and committed after successful implementation and testing of each feature. This ensured that the final commits represent stable and fully functional improvements.

While the commit history may appear condensed, the development process involved multiple stages of testing, debugging, and refinement before final integration.