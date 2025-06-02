const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
