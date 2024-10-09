const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))
 
app.use("/customer/auth/*", function auth(req, res, next) {
    const authHeader = req.headers['authorization']; // Get the Authorization header
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract the JWT token
        jwt.verify(token, "fingerprint_customer", (err, user) => {  // Verify token with the correct secret
            if (!err) {
                req.user = user; // Attach user info to request
                next();          // Pass to next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
