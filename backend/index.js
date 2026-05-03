require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const habitRoutes = require('./src/routes/habitRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup logging
// Ghi log ra màn hình console cho mọi request
app.use(morgan('dev'));
// Ghi log ra file backend-error.log đối với các request lỗi (status >= 400)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'backend-error.log'), { flags: 'a' });
app.use(morgan('combined', {
    stream: accessLogStream,
    skip: function (req, res) { return res.statusCode < 400 }
}));

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/habits', habitRoutes);

// Global Error Handler (Log lỗi backend)
app.use((err, req, res, next) => {
  console.error('\n[BACKEND ERROR LOG]', new Date().toISOString());
  console.error(err.message || err);
  
  // Ghi lỗi vào file log
  const errorMsg = `[${new Date().toISOString()}] ${err.message || err}\n`;
  fs.appendFileSync(path.join(__dirname, 'backend-error.log'), errorMsg);

  res.status(500).json({
    error: 'Đã xảy ra lỗi nội bộ trên server.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`👉 API Health Check: http://localhost:${PORT}/api/health`);
});
