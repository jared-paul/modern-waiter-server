const { pool } = require('./../config')

/**
 * Acquires items of a restaurant representing its 
 * menu. It returns a list of all the items 
 * belonging to the restaurant
 * @param {*} req Param includes restaurantId
 * @param {*} res List of items with a status code of 200 if successful, else 400.
 */
function getMenu(req, res){
    console.log("GET /items/{{restaurantId}}")
    let restaurantId = parseInt(req.params.restaurantId,10)

    if (isNaN(restaurantId)){
        res.status(400).send("Invalid restaurant id type, must be an integer")
        return
    }

    pool.query("SELECT * FROM items WHERE restaurant_id = $1", [restaurantId], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }

        res.status(200).send(result.rows)
        return
    })
}

/**
 * Adds an item to a restaurant's menu records
 * @param {*} req Body with details of an item
 * @param {*} res List of items with a status code of 200 if successful, else 400
 */
function addToMenu(req, res){
    console.log("POST /items")
    let restaurantId = req.body.restaurantId
    let name = req.body.name
    let type = req.body.type
    let cost = parseFloat(req.body.cost)
    let description = req.body.description
    let calories = parseFloat(req.body.calories)
    let popularityCount = parseInt(req.body.popularityCount,10)
    let image = req.body.image

    if (isNaN(cost) || isNaN(calories) || isNaN(popularityCount)){
        res.status(400).send("Invalid request body - cost and calories must be doubles, popularity count must be an integer")
        return
    }

    pool.query("INSERT INTO items (restaurant_id, name, type, cost, description, calories, popularity_count, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [restaurantId, name, type, cost, description, calories, popularityCount, image], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows)
        return
    })
}

module.exports = {getMenu, addToMenu} //getItemName