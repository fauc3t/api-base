const express = require('express');
const router = express.Router();

/**
 * Get user by ID
 */
router.get('/users/:id', function(req, res){
    res.status(200).send(`user id: ${req.params.id}`);
});

module.exports = router