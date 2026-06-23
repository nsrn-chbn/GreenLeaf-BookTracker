import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bookRoutes from './src/routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Book Tracker API is running!',
        endpoints: {
            books: '/api/books',
            health: '/health'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Book routes
app.use('/api/books', bookRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.url,
        method: req.method 
    });
});

app.listen(PORT, () => {
    console.log(`📚 Server running at http://localhost:${PORT}`);
    console.log(`✅ Health check: http://localhost:${PORT}/health`);
});