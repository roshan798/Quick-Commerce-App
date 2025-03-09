# 📌 Quick Commerce Backend API Checklist

## ✅ 1. User Authentication & Profile Management
- [x] `POST /auth/signup` → Register a new user  
- [x] `POST /auth/login` → Authenticate user, return JWT token  
- [ ] `GET /users/me` → Fetch logged-in user details  
- [ ] `PATCH /users/me` → Update user profile  
- [x] `POST /auth/logout` → Invalidate session/token  
- [ ] `POST /auth/google` → Login with Google OAuth  

---

## ⏳ 2. Product Management
- [x] `GET /products?page=1&size=10&orderBy=id` → Get a list of all products  
- [x] `GET /products/{id}` → Get product details by ID  
- [x] `POST /products` → Add a new product *(Admin Only)*  
- [x] `PUT /products/{id}` → Update product details *(Admin Only)*  
- [x] `DELETE /products/{id}` → Remove a product *(Admin Only)* 
- [ ] `GET /products/search?query=$1&page=1&size=10&orderBy=id` 

---

## ⏳ 3. Cart Management
- [x] `GET /cart` → Get user’s cart items  
- [x] `POST /cart` → Add product to cart  
- [x] `PATCH /cart/{id}` → Update quantity of a cart item  
- [x] `DELETE /cart/{id}` → Remove product from cart  
- [x] `DELETE /cart/clear` → Clear all cart items  

---

## ⏳ 4. Order Management
- [x] `POST /orders` → Create a new order from the cart  
- [x] `GET /orders` → Get all orders *(Admin)*  
- [ ] `GET /orders/{id}` → Get order details *(User/Admin)*  
- [ ] `PATCH /orders/{id}/status` → Update order status *(Admin)*  
- [x] `GET /orders/me` → Get orders of the logged-in user  

---

## ⏳ 5. Delivery Management
- [ ] `GET /delivery` → Get all deliveries *(Admin/Delivery Person)*  
- [ ] `GET /delivery/{id}` → Get delivery details  
- [ ] `PATCH /delivery/{id}/assign` → Assign a delivery person *(Admin Only)*  
- [ ] `PATCH /delivery/{id}/status` → Update delivery status *(Delivery Person)*  

---

## ⏳ 6. Warehouse Management
- [ ] `GET /warehouses` → List all warehouses  
- [ ] `GET /warehouses/{id}` → Get warehouse details  
- [ ] `POST /warehouses` → Add new warehouse *(Admin Only)*  
- [ ] `PATCH /warehouses/{id}` → Update warehouse details *(Admin Only)*  
- [ ] `DELETE /warehouses/{id}` → Remove warehouse *(Admin Only)*  

---

## ⏳ 7. Payment Processing
- [ ] `POST /payments` → Initiate a new payment  
- [ ] `GET /payments/{id}` → Get payment status  
- [ ] `POST /payments/webhook` → Handle payment success/failure webhook  

---

## ⏳ 8. Product Reviews & Ratings
- [ ] `POST /reviews` → Add a review for a product  
- [ ] `GET /reviews/{productId}` → Get all reviews for a product  
- [ ] `PATCH /reviews/{id}` → Update a review *(User Only)*  
- [ ] `DELETE /reviews/{id}` → Delete a review *(User/Admin)*  

---

## ⏳ 9. Category Management
- [ ] `GET /categories` → Get all categories  
- [ ] `POST /categories` → Add a new category *(Admin Only)*  
- [ ] `DELETE /categories/{id}` → Remove category *(Admin Only)*  
