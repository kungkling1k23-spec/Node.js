const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ตั้งค่าการเชื่อมต่อฐานข้อมูล PostgreSQL (ดึงค่าจาก Environment Variable ของ Render หรือใส่ค่าของคุณ)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// API ดึงข้อมูลรายวิชาทั้งหมด
app.get('/api/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM course');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});