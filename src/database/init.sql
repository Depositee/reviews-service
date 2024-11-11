DROP TABLE IF EXISTS reviews cascade;
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    depositor_id VARCHAR(48) NOT NULL, -- References the depositor
    depositee_id VARCHAR(48) NOT NULL, -- References the depositee
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), -- Rating between 1 and 5
    review_text TEXT NOT NULL, -- Review content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set to current time
    updated_at TIMESTAMP -- Can be NULL if not updated yet
);