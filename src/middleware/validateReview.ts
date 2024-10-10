// src/middleware/validateReview.ts
import {Request, Response, NextFunction} from 'express';

export const validateReview = (
   req: Request,
   res: Response,
   next: NextFunction
): void => {
   const {rating, reviewText} = req.body;
   if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({error: 'Rating must be between 1 and 5'});
      return;
   }
   if (!reviewText || reviewText.trim() === '') {
      res.status(400).json({error: 'Review text is required'});
      return;
   }
   next();
};
