const {fetchRecommendations} = require('../services/client');
const UserModel = require('../models/users');

// const getRecommendationsById = async (req, res) => {
//     try {
//         const userId = req.headers['user-id']
//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Missing verificated userId in the header"
//             })
//         }
//         const productId = req.params.pid;
//
//         // We get here an array of product's id [100, 101, 200]
//         const recommendationIds = await fetchRecommendations(userId, productId)
//         res.status(200).json({
//             success: true,
//             userId: userId,
//             target: productId,
//             data: recommendationIds
//         })
//     }
//     catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


const getRecommendationsById = async (req, res) => {
    // 1. Extract the variables carefully
    const restaurantId = req.params.id; // Not used for C++ server, but part of URL
    const productId = req.params.pId;
    const userId = req.headers['user-id']; // Or req.user.id if you use verifyAuth middleware

    // 2. Prevent sending undefined to C++
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Missing user-id in headers or token"
        });
    }

    try {
        // 3. DEBUG: Check exactly what is being sent!
        console.log(`[DEBUG] Sending to C++: GET ${userId} ${productId}`);

        // 4. Ensure userId is the FIRST argument, and productId is the SECOND
        const recommendations = await fetchRecommendations(userId, productId);

        res.status(200).json({ success: true, data: recommendations });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
}


module.exports = {
    getRecommendationsById
}