const express = require('express');
const {
  createOffer,
  getAllOffers,
  getOffersByJobPostId,
  getOfferById,
  updateOffer,
  deleteOffer,
  getJobOffersByRecruiter,
  getJobOffersByCandidate,
} = require('../controllers/offer.controller');

const router = express.Router();

router.post('/', createOffer);

router.get('/', getAllOffers);

router.get('/jobpost/:JobPostId', getOffersByJobPostId);

router.get('/:id', getOfferById);

router.patch('/:id', updateOffer);

router.delete('/:id', deleteOffer);

router.get('/recruiter/:recruiterId', getJobOffersByRecruiter);

router.get('/candidate/:candidateId', getJobOffersByCandidate);

module.exports = router;
