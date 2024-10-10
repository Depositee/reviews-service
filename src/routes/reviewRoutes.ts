import {Router, Request, Response} from 'express';
import {Review} from '../models/review';
import pool from '../db';

const router: Router = Router();

// Create a new review
router.post('/reviews', async (req, res) => {
   const {depositorId, depositeeId, rating, reviewText}: Review = req.body;

   try {
      const newReview = await pool.query(
         'INSERT INTO reviews (depositor_id, depositee_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
         [depositorId, depositeeId, rating, reviewText]
      );

      res.status(201).json(newReview.rows[0]);
   } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      res.status(500).send('Server error');
   }
});

// Get reviews by depositeeId (provider)
router.get('/reviews/depositee/:depositeeId', async (req, res) => {
   const {depositeeId} = req.params;

   try {
      const reviews = await pool.query(
         'SELECT * FROM reviews WHERE depositee_id = $1',
         [depositeeId]
      );

      res.json(reviews.rows);
   } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      res.status(500).send('Server error');
   }
});

// Update a review
router.put('/reviews/:id', async (req, res) => {
   const {id} = req.params;
   const {rating, reviewText}: Review = req.body;

   try {
      const updatedReview = await pool.query(
         'UPDATE reviews SET rating = $1, review_text = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
         [rating, reviewText, id]
      );

      if (updatedReview.rows.length === 0) {
         res.status(404).send('Review not found');
      }
      res.json(updatedReview.rows[0]);
   } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      res.status(500).send('Server error');
   }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
   const {id} = req.params;

   try {
      const deletedReview = await pool.query(
         'DELETE FROM reviews WHERE id = $1 RETURNING *',
         [id]
      );

      if (deletedReview.rows.length === 0) {
         res.status(404).send('Review not found');
      }

      res.status(204).send(); // Successfully deleted, no content returned
   } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(errorMessage);
      res.status(500).send('Server error');
   }
});

export default router;
