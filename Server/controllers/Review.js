import Review from "../models/Review.js"

// Adding a review

export const addReview = async (req, res) => {
    try {
        const { review_text, rating, item_id, customer_id } = req.body;
        const review = await Review.create({ review_text, rating, item_id, customer_id });
        res.status(201).json({
            review
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Deleting a review

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        res.json({
            review
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Updating a review

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { review_text, rating, item_id, customer_id } = req.body;
        const review = await Review.findByIdAndUpdate(id, { review_text, rating, item_id, customer_id }, { new: true });
        res.json({
            review
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Getting a review by id

export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        res.json({
            review
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Getting all reviews

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json({
            reviews
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// Getting all reviews for a specific item

export const getReviewsByItem = async (req, res) => {
    try {
        const { item_id } = req.params;
        const reviews = await Review.find({ item_id: item_id });
        res.json({
            reviews
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}