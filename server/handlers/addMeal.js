'use strict';

const addMeal = async (req, res) => {
    // Connect to mongo client
    const {clientDb} = res.locals;
    try {
        // Connect to DB:
        const db = clientDb.db("dinnerSwap");

        // Connect to collection:
        const meals = db.collection("meals")

        console.log(meals);
        

    } catch (err) {
        console.log(err)
    } finally {
        // Close connection
        clientDb.close()
    }

}

module.exports = addMeal;