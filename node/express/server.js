import express from 'express';
import dotenv from 'dotenv';
import { initExpressApp } from './expressInit.js';
import registerRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize express settings and middleware
initExpressApp(app);
registerRoutes(app);

// Routes
app.get('/', (req, res) => {
  res.render('pages/home', {
    title: `${app.locals.appName} Home`,
  });
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}` });
});

// 404 capture
app.use((req, res, next) => {
  const err = new Error('Not found');
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(404).render('pages/404', {
    title: '404',
    errorMessage: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
