const http = require("http");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/errorMiddleware");


const authRoutes = require("./routes/authRoutes");
const materialRoutes = require('./routes/materialRoutes');
const compteRoutes = require('./routes/compteRoutes');
const structureRoutes = require('./routes/structureRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bureauRoutes = require('./routes/bureauRoutes');
const salleRoutes = require('./routes/salleRoutes');
const demandeRoutes = require('./routes/demandeRoutes');
const rapportRoutes = require('./routes/rapportRoutes');

const PORT = process.env.PORT || 3000;

// Initialize express
const app = express();

// Setup Sequelize
const sequelize = require("./config/database"); 

// Middleware setup
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/material", materialRoutes);
app.use("/api/v1/compte", compteRoutes);
app.use("/api/v1/structures", structureRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/bureaux", bureauRoutes);
app.use("/api/v1/salles", salleRoutes);
app.use("/api/v1/demandes", demandeRoutes);
app.use("/api/v1/rapports", rapportRoutes);

// Handle unmounted routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// Start server and connect to database
const server = http.createServer(app);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
    return sequelize.sync(); 
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

