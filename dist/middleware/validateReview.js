"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReview = void 0;
const validateReview = (req, res, next) => {
    const { rating, reviewText } = req.body;
    if (!rating || rating < 1 || rating > 5) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
    }
    if (!reviewText || reviewText.trim() === '') {
        res.status(400).json({ error: 'Review text is required' });
        return;
    }
    next();
};
exports.validateReview = validateReview;
