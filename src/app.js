const express = require('express');
const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));