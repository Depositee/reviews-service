import express from 'express';
import reviewRoutes from './routes/reviewRoutes';
require('dotenv').config();

const app = express();
app.use(express.json()); // For parsing JSON bodies
app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

export default app;
