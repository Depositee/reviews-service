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
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Create a new review
router.post('/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depositorId, depositeeId, rating, reviewText } = req.body;
    try {
        const newReview = yield db_1.default.query('INSERT INTO reviews (depositor_id, depositee_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *', [depositorId, depositeeId, rating, reviewText]);
        res.status(201).json(newReview.rows[0]);
    }
    catch (err) {
        const errorMessage = err.message;
        console.error(errorMessage);
        res.status(500).send('Server error');
    }
}));
// Get reviews by depositeeId (provider)
router.get('/reviews/depositee/:depositeeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depositeeId } = req.params;
    try {
        const reviews = yield db_1.default.query('SELECT * FROM reviews WHERE depositee_id = $1', [depositeeId]);
        res.json(reviews.rows);
    }
    catch (err) {
        const errorMessage = err.message;
        console.error(errorMessage);
        res.status(500).send('Server error');
    }
}));
// Update a review
router.put('/reviews/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedReview = yield db_1.default.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
        if (deletedReview.rows.length == 0) {
            res.status(404).send('Review not found');
        }
        res.status(204).send();
    }
    catch (err) {
        const errorMessage = err.message;
        console.error(errorMessage);
        res.status(500).send('Server error');
    }
}));
// Delete a review
router.delete('/reviews/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedReview = yield db_1.default.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
        if (deletedReview.rows.length === 0) {
            res.status(404).send('Review not found');
        }
        res.status(204).send(); // Successfully deleted, no content returned
    }
    catch (err) {
        const errorMessage = err.message;
        console.error(errorMessage);
        res.status(500).send('Server error');
    }
}));
exports.default = router;
