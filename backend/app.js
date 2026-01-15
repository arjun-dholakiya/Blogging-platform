require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./database/models');
const morgan = require('morgan');
const authRoutes = require('./modules/v1/auth/routes/authRoutes');
const postRoutes = require('./modules/v1/post/routes/postRoutes');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

sequelize
  .authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error('Connection Failed') + err);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
