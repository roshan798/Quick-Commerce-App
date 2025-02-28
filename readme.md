# Quick Commerce Project

## Overview
This project consists of two main components:
1. **quick-commerce-backend**: A Spring Boot application for backend services.
2. **quick-commerce-client**: A React frontend application built with Vite.

## Prerequisites
Ensure you have the following installed on your system:
- **Java 21**
- **Node.js 20**
- **MySQL (or any preferred database)**

## Setup Instructions

### Backend Setup (Spring Boot)
1. Navigate to the backend directory:
   ```sh
   cd quick-commerce-backend
   ```
2. Create an `application.yml` file inside `src/main/resources` and configure your database:
   ```yaml
   server:
     port: 8080
     servlet:
       logging:
         request-details: true

   spring:
     application:
       name: QUICK-COMMERCE-SERVER
     
     datasource:
       url: jdbc:mysql://localhost:3306/quick_commerce
       username: root
       password: root
       driver-class-name: com.mysql.cj.jdbc.Driver

     jpa:
       hibernate:
         ddl-auto: update
       show-sql: true

     security:
       enabled: false

     devtools:
       restart:
         enabled: true

     web:
       resources:
         add-mappings: false

   logging:
     level:
       root: INFO
       org.springframework.web: DEBUG
       com.roshan798: TRACE
       org.springframework.security: DEBUG

   jwt:
     secret: <your_jwt_secret>
    # eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNjkxMjM0NT Y3LCJleHAiOjE3MjEyMzQ1Njd9.Gh1ZMzGkxflF3UQwzK79uVf5_TLpDhH_4hzlP4FJbW8
   ```
3. Build the project:
   ```sh
   ./mvnw clean install
   ```
4. Run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup (React + Vite)
1. Navigate to the client directory:
   ```sh
   cd quick-commerce-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and set up your API URL:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
4. Start the frontend application:
   ```sh
   npm run dev
   ```

## Contributing
Feel free to fork the repository and create pull requests for improvements.
