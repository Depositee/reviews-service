"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // This is the database connection file
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Test database connection when starting the server
db_1.default.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    }
    else {
        console.log('Successfully connected to the database');
    }
    done(); // Release the client back to the pool
});
// Simple test route to make sure the server is working
app.get('/', (req, res) => {
    res.send('API is working!');
});
// You can add other routes here
app.post('/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depositorId, depositeeId, rating, reviewText } = req.body;
    try {
        const newReview = yield db_1.default.query('INSERT INTO reviews (depositor_id, depositee_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *', [depositorId, depositeeId, rating, reviewText]);
        res.status(201).json(newReview.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}));
// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
