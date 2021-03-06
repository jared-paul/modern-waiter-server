const { pool } = require('./../config')

/**
 * Acquires details of a
 * restaurant using the restaurant id
 * @param {*} req Params include id
 * @param {*} res Returns the details with a status code of
 * 200 if successful, otherwise 400
 */
function getRestaurant(req, res){
    console.log("GET /restaurants/{{id}}")

    let id = parseInt(req.params.id,10)

    if (isNaN(id)){
        res.status(400).send("Invalid id type, must be an integer")
        return
    }

    pool.query("SELECT * FROM restaurant WHERE id = $1", [id], function(err, result){
        if(err){
            res.status(400).send(err)
            return
        }

        res.status(200).send(result.rows)
        return
    })
}

/**
 * Adds a restaurant to the database
 * @param {*} req Body with details of a restaurant
 * @param {*} res List of items with a status code of 200 if successful, else 400
 */
function addRestaurant(req, res){
    console.log("POST /restaurants")
    let taxPercentage = parseFloat(req.body.taxPercentage)
    let serviceFeePercentage = parseFloat(req.body.serviceFeePercentage)

    if (isNaN(taxPercentage) || isNaN(serviceFeePercentage)){
        res.status(400).send("Invalid percentages type, must be a double")
        return
    }

    let name = req.body.name
    let location = req.body.location

    pool.query("INSERT INTO restaurant (name, location, tax_percentage, service_fee_percentage) VALUES ($1, $2, $3, $4)", [name, location, taxPercentage, serviceFeePercentage], function(err, result){
        if (err) {
            res.status(400).send(err)
            return
        }
        res.status(200).send(result.rows)
        return
    })
}
module.exports = {getRestaurant, addRestaurant}
