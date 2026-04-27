const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/mongoDB');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});