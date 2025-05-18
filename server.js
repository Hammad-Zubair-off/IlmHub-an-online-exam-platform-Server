const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');

// Load .env file from root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://temp-red-gamma.vercel.app'  // Frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

// Health check root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend is running!' });
});

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 5001;

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client" , "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });   
} 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
