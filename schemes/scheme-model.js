const db = require("../data/dbConfig");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
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

function add (scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then(ids => {
            return findById(ids[0]);
        });
}

function update (changes, schemeId) {
    return findById(schemeId)
        .update(changes)
        .then(count => {
            return findById(schemeId);
        });
}

function remove (id) {
    let removedScheme = null;

    return findById(id)
        .then(scheme => {
            removedScheme = scheme;
            return findById(id).del();
        })
        .then(rows => {
            if (rows) {
                return removedScheme;
            }
        });
}