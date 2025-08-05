import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Проверяем наличие обязательных переменных окружения
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.error('Please check your .env file');
}

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres', // Попробуем стандартный пароль
    port: parseInt(process.env.DB_PORT || '5432'),
});

// Тестируем подключение
pool.on('connect', () => {
    console.info('Successfully connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;