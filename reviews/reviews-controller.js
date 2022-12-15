import * as reviewsDao from './reviews-dao.js'

const ReviewsController = (app) => {
    app.post('/api/reviews', postReview);
    app.get('/api/books/:workID/reviews', getReviewsByWorkID);
    app.get('/api/reviews/:userID/reviews', getReviewsByUserID);
}

const postReview = async (req, res) => {
    const review = req.body;
    const reviewer = req.session['currentUser'];
    if (reviewer) {
        review.reviewer = reviewer._id;
        const newReview = await reviewsDao.postReview(review);
        res.json(newReview);
    }
    else {
        res.sendStatus(403); // Must be logged in to post reviews
    }
}

const getReviewsByWorkID = async (req, res) => {
    const workID = req.params.workID;
    const reviews = await reviewsDao.findReviewsByWorkID(workID);
    // console.log(reviews)
    res.json(reviews);
}

const getReviewsByUserID = async (req, res) => {
    const userID = req.params.userID;
    const reviews = await reviewsDao.findReviewsByUserID(userID);
    // console.log(reviews)
    res.json(reviews);
}

export default ReviewsController;