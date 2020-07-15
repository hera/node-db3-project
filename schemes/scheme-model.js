const db = require("../data/dbConfig");

module.exports = {
    find,
    findById,
    findSteps
};

function find () {
    return db("schemes");
}

function findById (id) {
    return db("schemes").where({id});
}

function findSteps (id) {
    return db("schemes")
        .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
        .join("steps", "schemes.id", "=", "steps.scheme_id")
        .where({"schemes.id": id});
}