require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./database/models');

const authRoutes = require('./modules/v1/auth/routes/authRoutes');
const postRoutes = require('./modules/v1/post/routes/postRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://blogging-websitee.netlify.app'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

sequelize
  .authenticate()
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('DB Connection Failed:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
