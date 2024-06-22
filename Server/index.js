const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();
const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth/user", userRoutes);

const port = process.env.PORT;
app.listen(port, console.log(`server running on port ${port}`));
