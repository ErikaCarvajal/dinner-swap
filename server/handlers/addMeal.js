// 'use strict';

// const { sendResponse } = require("../lib/utils");

// const addMeal = async (req, res) => {
//     // Connect to mongo client
//     const {clientDb} = res.locals;
//     try {
//         // Connect to DB:
//         const db = clientDb.db("dinnerSwap");



//         // Connect to collection:
//         const meals = await db.collection("meals").insertOne(req.body);
//         // test connection to db:
//         console.log(meals);

//         // test request:
//         console.log(req.body)

//         sendResponse(res, 200, meals, )
//     } catch (err) {
//         console.log(err)
//     } finally {
//         // Close connection
//         clientDb.close()
//     }
// }

// module.exports = addMeal;